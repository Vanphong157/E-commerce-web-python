
import secrets
from bson import ObjectId
from fastapi import HTTPException, Request, Response
from BE.database import mongodb


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

    @staticmethod
    async def require_admin(request: Request):
        """
        Kiểm tra session và xác thực vai trò admin.
        """
        session = await SessionManager.get_session(request)
        user = await mongodb.db["users"].find_one({"_id": ObjectId(session["user_id"])})

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        if user.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admin privileges required")

        return user