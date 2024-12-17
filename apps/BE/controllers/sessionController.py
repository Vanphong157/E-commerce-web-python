
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
    async def delete_session(request: Request):
        """
        Xóa session từ MongoDB.
        """
        session_id = request.cookies.get("session_id")
        if not session_id:
            return

        await mongodb.db["sessions"].delete_one({"session_id": session_id})

    @staticmethod
    async def get_session(request: Request):
        """
        Lấy session_id từ Authorization header hoặc cookies.
        """
        auth_header = request.headers.get("Authorization")
        session_id = None

        if auth_header and auth_header.startswith("Bearer "):
            session_id = auth_header.split(" ")[1]
        else:
            session_id = request.cookies.get("session_id")

        if not session_id:
            raise HTTPException(status_code=401, detail="Session ID is missing")

        # Kiểm tra session trong database
        session = await mongodb.db["sessions"].find_one({"session_id": session_id})
        if not session:
            raise HTTPException(status_code=401, detail="Invalid session ID")

        return session

    @staticmethod
    async def require_admin(request: Request):
        """
        Kiểm tra quyền admin.
        """
        session = await SessionManager.get_session(request)
        user_id = session.get("user_id")

        # Lấy thông tin người dùng từ database
        user = await mongodb.db["users"].find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Kiểm tra role của user
        if user.get("role") != "admin":
            raise HTTPException(status_code=403, detail="Admin privileges required")

        return user