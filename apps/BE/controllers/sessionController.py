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
        try:
            session_id = secrets.token_hex(32)
            session_data = {
                "session_id": session_id,
                "user_id": user_id,
            }

            # Lưu session vào MongoDB
            await mongodb.db["sessions"].insert_one(session_data)

            # Gửi session_id trong cookie
            response.set_cookie(
                key="session_id",
                value=session_id,
                httponly=True,
                samesite='lax',
                secure=False,  # Set True if using HTTPS
                domain="localhost",  # Quan trọng: phải match với domain của frontend
                path="/"  # Cookie có hiệu lực cho toàn bộ domain
            )
            
            print("Created session:", session_data)  # Debug
            return session_id
            
        except Exception as e:
            print("Error creating session:", str(e))
            raise HTTPException(status_code=500, detail="Could not create session")

    @staticmethod
    async def get_session(request: Request):
        try:
            session_id = request.cookies.get("session_id")
            if not session_id:
                return None
                
            session = await mongodb.db["sessions"].find_one({"session_id": session_id})
            return session
            
        except Exception as e:
            print("Error in get_session:", str(e))  # Debug error
            return None

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
        try:
            # Debug: In ra cookies và headers
            print("Cookies:", request.cookies)
            print("Headers:", request.headers)
            
            session = await SessionManager.get_session(request)
            print("Session:", session)  # Debug session
            
            if not session:
                raise HTTPException(status_code=401, detail="Not authenticated")

            # Lấy thông tin user từ session
            user = await mongodb.db["users"].find_one({"_id": ObjectId(session["user_id"])})
            print("User:", user)  # Debug user info
            
            if not user or user.get("role") != "admin":
                raise HTTPException(status_code=403, detail="Admin access required")
                
        except Exception as e:
            print("Error in require_admin:", str(e))  # Debug error
            raise HTTPException(status_code=401, detail="Authentication failed")