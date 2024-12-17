from fastapi import HTTPException
from BE.database import mongodb
from bson import ObjectId
import bcrypt
import jwt
from datetime import datetime, timedelta

class AuthController:
    SECRET_KEY = "342dxcvasdcx"  # Trong thực tế nên lưu trong biến môi trường
    
    @staticmethod
    def create_token(user_data: dict):
        # Token hết hạn sau 24h
        expiration = datetime.utcnow() + timedelta(hours=24)
        token_data = {
            "user_id": str(user_data["_id"]),
            "email": user_data["email"],
            "role": user_data.get("role", "user"),
            "exp": expiration
        }
        token = jwt.encode(token_data, AuthController.SECRET_KEY, algorithm="HS256")
        return token

    @staticmethod
    async def register(user_data: dict):
        # Kiểm tra email đã tồn tại
        if await mongodb.db["users"].find_one({"email": user_data["email"]}):
            raise HTTPException(status_code=400, detail="Email already registered")

        # Hash password
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(user_data["password"].encode(), salt)
        user_data["password"] = hashed_password.decode()
        
        # Mặc định role là user
        user_data["role"] = user_data.get("role", "user")

        # Thêm user mới
        result = await mongodb.db["users"].insert_one(user_data)
        return {"message": "User registered successfully"}

    @staticmethod
    async def login(credentials: dict):
        try:
            user = await mongodb.db["users"].find_one({"email": credentials["email"]})
            if not user:
                raise HTTPException(status_code=401, detail="Invalid credentials")

            if not bcrypt.checkpw(credentials["password"].encode(), user["password"].encode()):
                raise HTTPException(status_code=401, detail="Invalid credentials")

            # Tạo token
            token = AuthController.create_token(user)

            # Đảm bảo tất cả các trường đều được trả về
            response_data = {
                "user_id": str(user["_id"]),
                "name": user.get("name", ""),
                "email": user["email"],
                "role": user.get("role", "user"),
                "isAdmin": user.get("role") == "admin",
                "token": token
            }
            
            print("Login response:", response_data)  # Debug log
            return response_data

        except Exception as e:
            print("Login error:", str(e))  # Debug log
            raise HTTPException(status_code=500, detail=str(e)) 