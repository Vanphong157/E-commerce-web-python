from fastapi import HTTPException
from BE.database import mongodb
from bson import ObjectId
import bcrypt

class AuthController:
    @staticmethod
    async def register(user_data: dict):
        # Kiểm tra email đã tồn tại
        if await mongodb.db["users"].find_one({"email": user_data["email"]}):
            raise HTTPException(status_code=400, detail="Email already registered")

        # Hash password
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(user_data["password"].encode(), salt)
        user_data["password"] = hashed_password.decode()

        # Thêm user mới
        result = await mongodb.db["users"].insert_one(user_data)
        return {"message": "User registered successfully"}

    @staticmethod
    async def login(credentials: dict):
        user = await mongodb.db["users"].find_one({"email": credentials["email"]})
        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")

        if not bcrypt.checkpw(credentials["password"].encode(), user["password"].encode()):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        return {
            "user_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"]
        } 