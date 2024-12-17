from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

MONGO_URI = "mongodb+srv://abcnam26:8jKcGDmZpAJHzkvY@test.fcrej.mongodb.net/test?retryWrites=true&w=majority&appName=test"

class MongoDB:
    def __init__(self):
        try:
            self.client = AsyncIOMotorClient(MONGO_URI)
            self.db = self.client.test  # sử dụng database 'test'
            print("Connected to MongoDB Atlas")
        except Exception as e:
            print(f"Lỗi kết nối MongoDB: {e}")
            raise e

    def get_db(self):
        return self.db

    async def close_connection(self):
        self.client.close()
        print("MongoDB connection closed.")

    async def check_connection(self):
        try:
            # Kiểm tra kết nối bằng cách ping database
            await self.client.admin.command('ping')
            return True
        except Exception as e:
            print(f"Lỗi kết nối: {e}")
            return False
mongodb = MongoDB()