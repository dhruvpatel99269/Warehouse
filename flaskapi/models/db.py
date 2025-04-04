import os
from pymongo import MongoClient
import gridfs
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client.get_database("surveillance")
fs = gridfs.GridFS(db)  # GridFS instance
