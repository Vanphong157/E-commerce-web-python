import secrets
from fastapi import HTTPException, Request, Response
from BE.controllers.sessionController import SessionManager
from BE.database import mongodb
import bcrypt


class UserController:
    @staticmethod
    async def signup(user_data: dict):
        """
        Đăng ký người dùng mới.
        """
        required_fields = ["username", "password", "role"]
        for field in required_fields:
            if field not in user_data:
                raise HTTPException(status_code=400, detail=f"Missing field: {field}")

        # Kiểm tra nếu username đã tồn tại
        existing_user = await mongodb.db["users"].find_one({"username": user_data["username"]})
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already exists")

        # Mã hóa mật khẩu
        hashed_password = bcrypt.hashpw(user_data["password"].encode("utf-8"), bcrypt.gensalt())
        user_data["password"] = hashed_password.decode("utf-8")

        # Lưu người dùng vào database
        await mongodb.db["users"].insert_one(user_data)
        return {"message": "User created successfully"}
    @staticmethod
    async def login(username: str, password: str, response: Response):
        """
        Xác thực người dùng và tạo session.
        """
        user = await mongodb.db["users"].find_one({"username": username})
        if not user:
            raise HTTPException(status_code=401, detail="Invalid username or password")

        # Kiểm tra mật khẩu
        import bcrypt
        if not bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8")):
            raise HTTPException(status_code=401, detail="Invalid username or password")

        # Tạo session và lưu session_id vào cookie
        session_id = await SessionManager.create_session(user_id=str(user["_id"]), response=response)
        return {"message": "Login successful", "session_id": session_id}

    @staticmethod
    async def logout(request: Request):
        """
        Xóa session và đăng xuất người dùng.
        """
        await SessionManager.delete_session(request)
        return {"message": "Logout successful"}