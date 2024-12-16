import secrets
from fastapi import HTTPException, Request, Response
from BE.database import mongodb
import bcrypt

class SessionManager:
    @staticmethod
    async def create_session(user_id: str, response: Response):
        """
        Tạo session mới và lưu vào database.
        """
        session_id = secrets.token_hex(32)
        session_data = {
            "session_id": session_id,
            "user_id": user_id,
        }

        # Lưu session vào MongoDB
        await mongodb.db["sessions"].insert_one(session_data)

        # Gửi session_id trong cookie
        response.set_cookie(key="session_id", value=session_id, httponly=True)
        return session_id

    @staticmethod
    async def get_session(request: Request):
        """
        Lấy thông tin session từ MongoDB.
        """
        session_id = request.cookies.get("session_id")
        if not session_id:
            raise HTTPException(status_code=401, detail="Not authenticated")

        # Truy vấn session từ MongoDB
        session = await mongodb.db["sessions"].find_one({"session_id": session_id})
        if not session:
            raise HTTPException(status_code=401, detail="Invalid session")

        return session

    @staticmethod
    async def delete_session(request: Request):
        """
        Xóa session từ MongoDB.
        """
        session_id = request.cookies.get("session_id")
        if not session_id:
            return

        await mongodb.db["sessions"].delete_one({"session_id": session_id})

class UserController:
    @staticmethod
    async def login(username: str, password: str, request: Request, response: Response):
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