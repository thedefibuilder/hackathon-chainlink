from pymongo import MongoClient
from langchain_community.embeddings.openai import OpenAIEmbeddings
from langchain_community.vectorstores import MongoDBAtlasVectorSearch, VectorStore
from langchain_community.document_loaders import DirectoryLoader
from langchain_community.llms import openai
from langchain.chains import retrieval_qa
import os
from dotenv import load_dotenv, find_dotenv
import utils
from utils import logger, ATLAS_DB_URI
from pathlib import Path
import json
import pickle
from langchain_core.documents import Document
load_dotenv(find_dotenv())
'''
This module will provide functions that will allow us to query our vector 
database, format and prompt our chosen LLM and also search our vector database 
for context data for our queries
'''

def code_similarity_search(code, k=5, model="text-embedding-3-small"):
    mongoclient = MongoClient(ATLAS_DB_URI)
    embeddings = OpenAIEmbeddings(
        model=model,
        openai_api_type=os.environ.get('OPENAI_API_KEY')
    )

    db_name=os.environ.get("ATLAS_DB_DBNAME")
    collectionName=os.environ.get("ATLAS_DB_COLLECTION_NAME")
    collection = mongoclient[db_name][collectionName]

    vector_search=MongoDBAtlasVectorSearch(
        collection=collection,
        embedding=embeddings
    )

    results = vector_search.similarity_search_with_relevance_scores(code, k=k)

    return results

    