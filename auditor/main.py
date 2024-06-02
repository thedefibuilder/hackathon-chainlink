from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import Optional
from manage_data import create_document, add_documents
from generate import generate_function_audit, check_distance, FunctionAuditReport
from langchain_community.vectorstores import MongoDBAtlasVectorSearch
from pymongo.errors import ConnectionFailure,OperationFailure,BulkWriteError
from fastapi.exceptions import HTTPException
import os
from utils import logger, ATLAS_DB_URI
from enum import Enum
'''
Module to define our API endpoints
'''

class Severity(Enum):
    high = "high"
    medium = "medium"
    low = "low"

class CodeExample(BaseModel):
    code: str = Field(description="A smart contract function")
    detail: str = Field(description="Details of the function vulnerability")
    impact: Optional[str] = Field(description="Impact of the vulnerability", default=None)
    likelihood: Optional[str] = Field(description="Likelihood of the vulnerability being exploited", default=None)
    severity: Optional[str] = Field(description="Severity of the vulnerability", default=None)
    recommendation: Optional[str] = Field(description="Recommendation to fix the vulnerability", default=None)

class CodeExampleList(BaseModel):
    code_examples: list[CodeExample] = Field(description="List of code examples to add to the vulnerability store")
    collection: str = Field(description="The vectorstore collection to add the code examples to", default="v1")

class Query(BaseModel):
    function_code: str = Field(description="A smart contract function to audit for vulnerabilities")

class VulnerabilityAuditReport(BaseModel):
    start_line:int = Field(description="Start line of the code that exhibit the vulnerability")
    end_line:int = Field(description="End line of the code that exhibit the vulnerability")
    detail:str = Field(description="Detail of the vulnerability")
    severity:str = Field(description="The severity of the vulnerability, accepts values: high, medium, low")
    title:str = Field(description="Give the discovered vulnerability a title, this can be a single sentence summary of the vulnerability")
    recommendation:str = Field(description="Recommended remedial action to fix code vulnerabilities")
    certainty_score:int = Field(description="A score between 0-100 that determines how sure we are of the vulnerability being corrent and applicable")

class FunctionAuditReportOut(BaseModel):
    function_code:str  = Field(description="The function code that was audited")
    vulnerabilities:list[VulnerabilityAuditReport] = Field(description="List of vulnerabilities detected in the function")

class UniquenessScore(BaseModel):
    status:int = Field(description="The status of the request")
    score:float = Field(description="The uniqueness score of the vulnerability")

class DocumentsAdded(BaseModel):
    status:int = Field(description="The status of the request")
    detail:str = Field(description="Details of the request")

description="""
### API Endpoints for the DeFi Builder AI Auditor

Currently supported actions include:

**Audit Function:**
Evaluate a smart contract function for vulnerabilities.
The returned response will container the AI generated vulnerbalities
that have been detected for the given function.

**Uniqueness Score:**
Determine how unique a discovered vulnerability is. This is used to judge
the vulnerabilites submitted by human auditors

**Add Code Examples:**
To add human auditor discovered vulnerabilities to the model so they can be 
used for future assessments.
"""

app = FastAPI(
    title="DeFi Builder AI Auditor endpoints",
    description=description,
    version="0,1",
)

## Add documents
@app.post("/add_code_examples", response_model=DocumentsAdded)
async def add_code_examples(snippets:CodeExampleList) -> JSONResponse:
    docs = []
    for snippet in snippets.code_examples:
        docs.append(create_document(
            code=snippet.code,
            detail=snippet.detail,
            impact=snippet.impact,
            likelihood=snippet.likelihood,
            severity=snippet.severity,
            recommendation=snippet.recommendation
        ))
    dbname=os.environ.get('ATLAS_DB_DBNAME')
    collection=snippets.collection or os.environ.get('ATLAS_DB_COLLECTION_NAME')
    try:
        add_documents(
            docs=docs,
            vectorstore=MongoDBAtlasVectorSearch().from_connection_string(
                connection_string=ATLAS_DB_URI,
                namespace=f"{dbname}.{collection}"
            )
        )
        # Search VectorDB for 

        return {
            "status": 201, 
            "detail": "Code examples were successfully added to vulnerbaility store"
        }
    except ConnectionFailure as e:
        raise HTTPException(
            status_code=503,
            detail=f"Connection Error: {e}"
        )
    except (BulkWriteError, OperationFailure) as e:
        raise HTTPException(
            status_code=500,
            detail=f"There was an error adding code examples: {e}"
        )
        
## Query model
### We want to query the vector DB for similarity, then we will prompt the LLM 
### to detect vulnerabilities, then we will query to suggest recommendations
@app.post('/audit_function')
async def audit_function(_function:Query) -> FunctionAuditReportOut:
    try:
        function_audit = generate_function_audit(_function.function_code)
        return function_audit
    
    except ConnectionFailure as e:
        raise HTTPException(
            status_code=503,
            detail=f"Connection Error: {e}"
        )
    except (BulkWriteError, OperationFailure) as e:
        raise HTTPException(
            status_code=500,
            detail=f"There was an error adding code examples: {e}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@app.post("/uniqueness_score", response_model=UniquenessScore)
async def get_uniqueness_score(vulnerability:CodeExample) -> JSONResponse:
    try:
        score = check_distance(
            vulnerability.detail, 
            db_name="vulnerability_details", 
            collection="v1"
        )
        return {"status": 200, "score": round(score, 2)}
    
    except ConnectionFailure as e:
        raise HTTPException(
            status_code=503,
            detail=f"Connection Error: {e}"
        )
    except (BulkWriteError, OperationFailure) as e:
        raise HTTPException(
            status_code=500,
            detail=f"There was an error adding code examples: {e}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

## TODO: Eventually we will add a training endpoint as well