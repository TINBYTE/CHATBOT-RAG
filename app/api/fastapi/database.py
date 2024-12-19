from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import PyMongoError

# MongoDB Configuration
MONGO_URI = "mongodb://localhost:27017"
DATABASE_NAME = "exam_generator"

client = AsyncIOMotorClient(MONGO_URI)
db = client[DATABASE_NAME]

# Users collection
users_collection = db["users"]

# To ensure unique usernames and emails, set up indexes in MongoDB
try:
    users_collection.create_index("username", unique=True)
    users_collection.create_index("email", unique=True)
except PyMongoError:
    pass