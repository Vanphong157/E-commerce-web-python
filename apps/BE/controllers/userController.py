import secrets
from fastapi import HTTPException, Request, Response
from BE.controllers.sessionController import SessionManager
from BE.database import mongodb
import bcrypt
from bson import ObjectId


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
        return {"message": "Login successful", "session_id": session_id , "user_id": str(user["_id"])}

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