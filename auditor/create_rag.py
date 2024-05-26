from pymongo import MongoClient
from langchain_community.embeddings.openai import OpenAIEmbeddings
from langchain_community.vectorstores import MongoDBAtlasVectorSearch
from langchain_community.document_loaders import DirectoryLoader
from langchain_community.llms import openai
from langchain.chains import retrieval_qa
import os
from dotenv import load_dotenv, find_dotenv
import utils
from utils import logger
from pathlib import Path
import json
import pickle

load_dotenv(find_dotenv())

ATLAS_DB_URI = ''.join(["mongodb+srv://",
                f"{os.environ.get('ATLAS_DB_USERNAME')}:",
                f"{os.environ.get('ATLAS_DB_PASSWORD')}",
                "@ai-auditor-dev.2mfs29p.mongodb.net/?retryWrites=true&w=majority",
                "&appName=ai-auditor-dev"])

def ping_mongodb():
    client = MongoClient(ATLAS_DB_URI)
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)

# Load Data
## Load text files locally
def load_data(save_to_pickle=True, force_reload=False):
    if os.path.exists(Path(utils.DATADIR) / 'data.pickle') and not force_reload:
        logger.info("Loading data from pickle file")
        with open(Path(utils.DATADIR) / 'data.pickle', 'rb') as f:
            data = pickle.load(f)
        return data

    datafiles = [file for file in os.listdir(utils.DATADIR)
                if os.path.isfile(Path(utils.DATADIR) / file)
                and file.endswith('.txt')]
    data = []
    logger.info("Starting Data load, loading data from %s files", len(datafiles))
    for file in datafiles:
        logger.info("Reading file: %s", file)
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
                        data.append(json.loads(json_data))
                    except json.JSONDecodeError as e:
                        pass
                    logger.debug("Read JSON Data: %s", data[-1].keys())
                    json_data = ""
                    continue

                if read_data:
                    json_data += line
                    
    logger.info("Loaded data from files")
    if save_to_pickle:
        logger.info("Saving data to pickle file")
        with open(Path(utils.DATADIR) / 'data.pickle', 'wb') as f:
            pickle.dump(data, f)
    
    return data
  
# Process Data
## Split Data by functions

## Clean Data

# Embed Data
## We need to create the embeddings
## We need to store the original text mapped to the embeddings
## We need to store the vulnerability detail mapped to the embeddings

# Store in MongoDB Vector Store
## Upload to MondoDB
## Upload Hash mappings to MongoDB




