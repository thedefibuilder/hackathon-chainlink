from pymongo import MongoClient
from langchain_community.embeddings.openai import OpenAIEmbeddings
from langchain_community.vectorstores import MongoDBAtlasVectorSearch, VectorStore
import os
from dotenv import load_dotenv, find_dotenv
import utils
from utils import logger, ATLAS_DB_URI
from pathlib import Path
import json
import pickle
from langchain_core.documents import Document
load_dotenv(find_dotenv())

"""
This module will be reponsible for initializing the vector store as well as 
adding data to the vector store as it is collected. We also have functions
that will allow us to clean data.
"""

def load_data(
        save_to_pickle=True, 
        force_reload=False, 
        suffix="_vulnerabilities_formatted.txt"
):
    if os.path.exists(Path(utils.DATADIR) / 'data.pickle') and not force_reload:
        logger.info("Loading data from pickle file")
        with open(Path(utils.DATADIR) / 'data.pickle', 'rb') as f:
            data = pickle.load(f)
        return data

    datafiles = [file for file in os.listdir(utils.DATADIR)
                if os.path.isfile(Path(utils.DATADIR) / file)
                and file.endswith('.txt')]
    data = {}
    logger.info("Starting data load, loading data from %s files", len(datafiles))
    for file in datafiles:
        logger.info("Reading file: %s", file)
        section_data = []
        with open(Path(utils.DATADIR) / file, 'r', encoding='utf-8') as f:
            read_data = False
            json_data = ""
            for line in f:
                if "----Start JSON----" in line:
                    read_data = True
                    continue

                if "----End JSON----" in line:
                    read_data = False
                    try:
                        section_data.append(json.loads(json_data))
                    except json.JSONDecodeError as e:
                        pass
                    logger.debug("Read JSON Data: %s", section_data[-1].keys())
                    json_data = ""
                    continue

                if read_data:
                    json_data += line
            
            data[file.removesuffix(suffix)] = section_data
            
    logger.info("Loaded data from files")
    if save_to_pickle:
        logger.info("Saving data to pickle file")
        with open(Path(utils.DATADIR) / 'data.pkl', 'wb') as f:
            pickle.dump(data, f)
    
    return data

def get_cleaned_explanations(entry, exclude_keys=[]):
    text = ''
    EXCLUDE_KEYS = [
        'code',
        'Recommendation',
        "Mitigation Review",
        "Recommendations",
        "Cyfrin",
        "Client",
        "Recommended Mitigation",
        "Resolution",
        "Example",
    ] + exclude_keys
    
    for k in entry:
        if k not in EXCLUDE_KEYS:
            text += k + ': ' + ''.join(entry[k]) + ' '
    
    text.replace('\n', ' ')

    return text

def split_and_combine_code(code, min_snippet_len=10, max_snippet_len=1000):
    return_code = []
    for snippet in code:
        return_code += [s for s in utils.split_code_by_function(snippet) if s
                        and len(s) > min_snippet_len
                        and len(s) < max_snippet_len]
    
    return return_code

def make_document(entry):
        return Document(
                page_content=''.join(entry[0]),
                metadata={"explanation": entry[1]}
        )

def initialize_mongo_vectorstore(
        docs:Document, 
        database: str,
        collection: str,
        mongoclient: MongoClient,
        embeddings_model:str
):
    mongoclient = MongoClient(utils.ATLAS_DB_URI)

    embeddings = OpenAIEmbeddings(
        model=embeddings_model,
        openai_api_key=os.environ.get('OPENAI_API_KEY')
    )

    db_name = database
    collectionName = collection
    collection = mongoclient[db_name][collectionName]

    vector_store = MongoDBAtlasVectorSearch.from_documents(
        docs,
        embedding=embeddings,
        collection=collection,
    )

    return vector_store

def add_documents(docs: list[Document], vectorstore: VectorStore):
    if not isinstance(docs[0], list):
        try:
            docs = [make_document(entry=e) for e in docs]
        except IndexError:
            logger.error("Unsupported format, raw documents should be tuple of\
                         code and vulnerability detail e.g. (code, detail)")
            
        return vectorstore.add_documents(
            documents=docs,
        )

def create_document(code, detail, **kwargs):
    text = f'Description: {detail}'

    for k in kwargs:
        if kwargs[k]:
            text += f'{k.capitalize():{kwargs[k]}}'
    
    return Document(page_content=code, metadata={"explanation":text})
    