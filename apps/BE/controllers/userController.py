import secrets
from fastapi import HTTPException, Request, Response
from BE.database import mongodb
import bcrypt
from bson import ObjectId

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

    @staticmethod
    async def get_user(user_id: str):
        try:
            if not ObjectId.is_valid(user_id):
                raise HTTPException(status_code=400, detail="Invalid user ID")

            user = await mongodb.db["users"].find_one({"_id": ObjectId(user_id)})
            if not user:
                raise HTTPException(status_code=404, detail="User not found")

            # Loại bỏ password trước khi trả về
            user.pop('password', None)
            user["_id"] = str(user["_id"])
            
            return user

        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    async def update_user(user_id: str, user_data: dict):
        try:
            if not ObjectId.is_valid(user_id):
                raise HTTPException(status_code=400, detail="Invalid user ID")

            # Kiểm tra email đã tồn tại chưa (nếu có thay đổi email)
            if "email" in user_data:
                existing_user = await mongodb.db["users"].find_one({
                    "email": user_data["email"],
                    "_id": {"$ne": ObjectId(user_id)}
                })
                if existing_user:
                    raise HTTPException(status_code=400, detail="Email already exists")

            # Cập nhật thông tin user
            result = await mongodb.db["users"].update_one(
                {"_id": ObjectId(user_id)},
                {"$set": user_data}
            )

            if result.modified_count == 0:
                raise HTTPException(status_code=404, detail="User not found")

            return {"message": "User updated successfully"}

        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    async def change_password(user_id: str, password_data: dict):
        try:
            if not ObjectId.is_valid(user_id):
                raise HTTPException(status_code=400, detail="Invalid user ID")

            user = await mongodb.db["users"].find_one({"_id": ObjectId(user_id)})
            if not user:
                raise HTTPException(status_code=404, detail="User not found")

            # Kiểm tra mật khẩu cũ
            if not bcrypt.checkpw(
                password_data["old_password"].encode(),
                user["password"].encode()
            ):
                raise HTTPException(status_code=400, detail="Invalid old password")

            # Hash mật khẩu mới
            salt = bcrypt.gensalt()
            hashed_password = bcrypt.hashpw(
                password_data["new_password"].encode(),
                salt
            ).decode()

            # Cập nhật mật khẩu mới
            result = await mongodb.db["users"].update_one(
                {"_id": ObjectId(user_id)},
                {"$set": {"password": hashed_password}}
            )

            if result.modified_count == 0:
                raise HTTPException(status_code=404, detail="User not found")

            return {"message": "Password changed successfully"}

        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    async def update_avatar(user_id: str, avatar_url: str):
        try:
            if not ObjectId.is_valid(user_id):
                raise HTTPException(status_code=400, detail="Invalid user ID")

            result = await mongodb.db["users"].update_one(
                {"_id": ObjectId(user_id)},
                {"$set": {"avatar": avatar_url}}
            )

            if result.modified_count == 0:
                raise HTTPException(status_code=404, detail="User not found")

            return {"message": "Avatar updated successfully"}

        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))