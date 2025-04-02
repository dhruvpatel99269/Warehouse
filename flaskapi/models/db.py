from pymongo import MongoClient
import gridfs

MONGO_URI = "mongodb+srv://99269dhruvpatel:Dhruv99269@node-tuts.cc8rxtp.mongodb.net/"  # Use .env or fallback

client = MongoClient(MONGO_URI)
db = client.get_database("surveillance")
fs = gridfs.GridFS(db)  # GridFS instance
