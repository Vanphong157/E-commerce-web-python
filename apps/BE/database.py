from motor.motor_asyncio import AsyncIOMotorClient

class MongoDB:
    def __init__(self, uri="mongodb://localhost:27017/", db_name="test"):
        self.client = AsyncIOMotorClient(uri)
        self.db = self.client[db_name]
        print(f"Connected to MongoDB: {db_name}")

    async def close_connection(self):
        self.client.close()
        print("MongoDB connection closed.")

mongodb = MongoDB()