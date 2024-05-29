from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from manage_data import create_document, add_documents
from generate import FunctionAuditReport, generate_function_audit
from langchain_community.vectorstores import MongoDBAtlasVectorSearch
from pymongo.errors import ConnectionFailure,OperationFailure,BulkWriteError
from fastapi.exceptions import HTTPException
import os
from utils import logger, ATLAS_DB_URI
'''
Module to define our API endpoints
'''

class CodeExample(BaseModel):
    code: str
    detail: str
    impact: Optional[str] = None
    likelihood: Optional[str] = None
    severity: Optional[str] = None
    recommendation: Optional[str] = None

class CodeExampleList(BaseModel):
    code_examples: list[CodeExample]
    collection: str = "v1"

class Query(BaseModel):
    function_code: str

app = FastAPI()

## Add documents
@app.post("/add_code_examples/")
async def add_code_examples(snippets:CodeExampleList):
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
@app.post('/audit_function/')
async def audit_function(_function:Query):
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

## TODO: Eventually we will add a training endpoint as well