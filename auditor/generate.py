from pymongo import MongoClient
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import VectorStore
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_core.prompts import PipelinePromptTemplate, PromptTemplate
from langchain_core.pydantic_v1 import BaseModel, Field
from enum import Enum
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_community.llms import openai
from langchain.chains import retrieval_qa
import os
from dotenv import load_dotenv, find_dotenv
import utils
from utils import logger, ATLAS_DB_URI
from pathlib import Path
import tiktoken
from langchain_core.documents import Document
load_dotenv(find_dotenv())
'''
This module will provide functions that will allow us to query our vector 
database, format and prompt our chosen LLM and also search our vector database 
for context data for our queries
'''

class Severity(Enum):
    high = "high"
    medium = "medium"
    low = "low"

class Vulnerability(BaseModel):
    start_line:int = Field(description="Start line of the code that exhibit the vulnerability")
    end_line:int = Field(description="End line of the code that exhibit the vulnerability")
    detail:str = Field(description="Detail of the vulnerability")
    severity:Severity = Field(description="The severity of the vulnerability, accepts values: high, medium, low")
    title:str = Field(description="Give the discovered vulnerability a title, this can be a single sentence summary of the vulnerability")

class VulnerabilityList(BaseModel):
    vulnerabilites:list[Vulnerability] = Field(description="A list of all vulnerabilites found in the user code")

class Recommendation(BaseModel):
    recommendation:str = Field(description="Recommended remedial action to fix code vulnerabilities")

class VulnerabilityAuditReport(BaseModel):
    start_line:int = Field(description="Start line of the code that exhibit the vulnerability")
    end_line:int = Field(description="End line of the code that exhibit the vulnerability")
    detail:str = Field(description="Detail of the vulnerability")
    severity:Severity = Field(description="The severity of the vulnerability, accepts values: high, medium, low")
    title:str = Field(description="Give the discovered vulnerability a title, this can be a single sentence summary of the vulnerability")
    recommendation:str = Field(description="Recommended remedial action to fix code vulnerabilities")

class FunctionAuditReport(BaseModel):
    function_code:str = Field(description="Function code")
    vulnerabilities:list[VulnerabilityAuditReport] = Field(description="List of function vulnerabilites and remidial recommendations")


def object_similarity_search(
        object, 
        k=5, 
        model="text-embedding-3-small", 
        db_name=os.environ.get("ATLAS_DB_DBNAME"),
        collection_name = os.environ.get("ATLAS_DB_COLLECTION_NAME")
):
    mongoclient = MongoClient(ATLAS_DB_URI)
    embeddings = OpenAIEmbeddings(
        model=model,
        openai_api_type=os.environ.get('OPENAI_API_KEY')
    )

    db_name=db_name
    collection_name=collection_name
    collection = mongoclient[db_name][collection_name]

    vector_search=MongoDBAtlasVectorSearch(
        collection=collection,
        embedding=embeddings
    )

    results = vector_search.similarity_search_with_relevance_scores(object, k=k)

    return results

SYSTEM_PROMPT=SystemMessage("""
You are a blockchain smart contract auditor. 
You help users understand if their smart contracts have vulnerabilites or not.
Given your own knowledge and context information, you will identify if a given piece of code has vulnerabilites.
You will need to identify line numbers for the vulnerable user code as well as give a description of why it is vulnerable and what can be done to mkae it more secure.
""")

structure_prompt = (
    
)

def create_function_prompt(user_code:str):
    token_limit = 4096
    encoding = tiktoken.get_encoding("cl100k_base")
    system_prompt = SystemMessage("""
    You are a blockchain smart contract auditor. 
    You help users understand if their smart contracts have vulnerabilites or not.
    Given your own knowledge and context information, you will identify if a given function of code has vulnerabilites.
    Be specific in you analysis and reference the user's code when explaining why the code is vulnerable.
    You will need to identify start and end line number for the vulnerable user code as well as give a description of why the code is vulnerable.
    Please provide a list of discovered vulnerabilites.
    """)
    user_start = (
      "Analyze vulnerabilites in the smart contract code using the context below and your own knowledge.\n\n"+
      "Context:\n"
    )

    user_end = (
        "Please analyze the following smart contract code for vulnerabilites: \n"
    )

    prompt = (
        system_prompt +
        HumanMessage(content=user_start) +
        "{context}" +
        HumanMessage(content=user_end) +
        "{user_code}"
    )


    tokens_consumed = len(encoding.encode(
        prompt.format(context='', user_code=user_code)
    ))

    context_tokens_available = token_limit - tokens_consumed
    context = object_similarity_search(
        user_code, 
        db_name="code_snippets", 
        collection_name='v1'
    )

    contexts = ""
    for i in range(len(context)):
        formatted = context[i][0].page_content + context[i][0].metadata['explanation']
        context_tokens = len(encoding.encode(formatted))

        if (context_tokens_available) >= context_tokens:
            contexts += formatted + "\n\n"
            context_tokens_available -= context_tokens + 2
    
    return prompt.format(context=contexts, user_code=user_code)

def discover_function_vulnerabilites(
        user_function:str, 
        model:str="gpt-3.5-turbo-0125"
) -> VulnerabilityList:
    '''
    Query LLM with functions to see if they are vulnerable or not
    '''
     

    prompt = create_function_prompt(user_function)
    llm = ChatOpenAI(model=model, temperature=0)
    structured_llm = llm.with_structured_output(VulnerabilityList)

    answer = structured_llm.invoke(prompt)
    return answer

def create_recommendation_prompt(code:str, vulnerability_detail:VectorStore):
    '''
    Given vulnerable code and vulnerability detail, suggest recommendations
    to make the code secure
    '''
    token_limit = 4096
    encoding = tiktoken.get_encoding("cl100k_base")
    system_prompt = SystemMessage("""
    You are a blockchain smart contract auditor. 
    You help users understand if their smart contracts have vulnerabilites or not.
    Given your own knowledge and context information, 
    as well as user provided vulnerable code and vulnerability detail, 
    provide a recommendation by modifying the code implementation to fix the vulnerability
    """)
    user_start = (
      """Provide recommendations to modify the user and mitigate the identified 
      vulnerabilites. Use the context below and your own knowledge.\n\n"""+
      "Context:\n"
    )

    user_end = (
        """Please consider the following code and identified vulnerabilites and 
        provide recommendations to mitigate the vulnerabilites. Please give specific
        examples referencing the user's code: \n"""
    )

    prompt = (
        system_prompt +
        HumanMessage(content=user_start) +
        "{context}" +
        HumanMessage(content=user_end) +
        "{user_code}"+
        "{vulnerability_detail}"
    )


    tokens_consumed = len(encoding.encode(
        prompt.format(
            context='', 
            user_code=code, 
            vulnerability_detail=vulnerability_detail
        )
    ))

    context_tokens_available = token_limit - tokens_consumed
    context = object_similarity_search(
        vulnerability_detail,
        db_name="vulnerability_details",
        collection_name="v1"
    )

    contexts = ""
    for i in range(len(context)):
        formatted = ''.join(["EXAMPLE_VULNERABILITY:\n",
                            context[i][0].page_content,
                            "\nEXAMPLE_RESOLUTION:\n",
                            context[i][0].metadata['resolution']])
        
        context_tokens = len(encoding.encode(formatted))

        if (context_tokens_available) >= context_tokens:
            contexts += formatted + "\n\n"
            context_tokens_available -= context_tokens + 2
    
    return prompt.format(
        context=contexts, 
        user_code=code, 
        vulnerability_detail=vulnerability_detail
    )

def generate_recommendations(
        user_function:str, 
        vulnerability_detail:str, 
        model:str="gpt-3.5-turbo-0125",
) -> Recommendation:
    
    prompt = create_recommendation_prompt(user_function, vulnerability_detail)
    llm = ChatOpenAI(model=model, temperature=0)
    structured_llm = llm.with_structured_output(Recommendation)

    answer = structured_llm.invoke(prompt)
    return answer

def generate_function_audit(user_function) -> FunctionAuditReport:
    # Split contract by functions; Generate vulnerabilites for each function
    vulnerabilites = []
    
    func_vuln = discover_function_vulnerabilites(user_function=user_function)
    
    for vuln in func_vuln.vulnerabilites:
        vuln_recommendation = generate_recommendations(
            user_function=user_function, 
            vulnerability_detail=vuln.detail+"Severity:"+vuln.severity.value
        )
        
        vulnerabilites.append(VulnerabilityAuditReport(
            start_line=vuln.start_line,
            end_line=vuln.end_line,
            detail=vuln.detail,
            severity=vuln.severity,
            title=vuln.title,
            recommendation=vuln_recommendation.recommendation
        ))

    return FunctionAuditReport(
        function_code=user_function,
        vulnerabilities=vulnerabilites
    )

if __name__ == "__main__":
    code = "function verify(\n    bytes calldata inputTxBytes,\n    uint16 outputIndex,\n    uint256 inputTxPos,\n    bytes calldata spendingTxBytes,\n    uint16 inputIndex,\n    bytes calldata signature,\n    bytes calldata /\\*optionalArgs\\*/\n)\n    external\n    view\n    returns (bool)\n{\n    PaymentTransactionModel.Transaction memory inputTx = PaymentTransactionModel.decode(inputTxBytes);\n    require(inputTx.txType == supportInputTxType, \"Input tx is an unsupported payment tx type\");\n\n    PaymentTransactionModel.Transaction memory spendingTx = PaymentTransactionModel.decode(spendingTxBytes);\n    require(spendingTx.txType == supportSpendingTxType, \"The spending tx is an unsupported payment tx type\");\n\n    UtxoPosLib.UtxoPos memory utxoPos = UtxoPosLib.build(TxPosLib.TxPos(inputTxPos), outputIndex);\n    require(\n        spendingTx.inputs[inputIndex] == bytes32(utxoPos.value),\n        \"Spending tx points to the incorrect output UTXO position\"\n    );\n\n    address payable owner = inputTx.outputs[outputIndex].owner();\n    require(owner == ECDSA.recover(eip712.hashTx(spendingTx), signature), \"Tx in not signed correctly\");\n\n    return true;\n}\n\n"
    vulnerability = "The function does not validate the length of the 'signature' parameter, which could lead to potential vulnerabilities such as buffer overflow or memory corruption."
    # results = code_similarity_search(code)
    # print(results)
    # encoding = tiktoken.get_encoding("cl100k_base")
    # print(results[0])
    # print(encoding.encode(results[0][0].page_content))

    #print(create_function_prompt(user_code=code))
    #print(discover_function_vulnerabilites(code))
    #print(create_recommendation_prompt(code, vulnerability))

    #print(generate_recommendations(code, vulnerability))
    print(generate_function_audit(code))