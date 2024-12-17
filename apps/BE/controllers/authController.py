from fastapi import HTTPException
from BE.database import mongodb
from bson import ObjectId
import bcrypt
import jwt

SECRET_KEY = "e0c83453f11624f5fc9f3f2c187c86671f3d02d6e8ee6d1a9b89c3f4d8e5a6b7" 

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

        # Tạo JWT token
        token = jwt.encode(
            {"user_id": str(user["_id"])},
            SECRET_KEY,
            algorithm="HS256"
        )

        return {
            "token": token,
            "user_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"]
        } 