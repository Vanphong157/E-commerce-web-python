import secrets
from fastapi import HTTPException, Request, Response
from BE.controllers.sessionController import SessionManager
from BE.database import mongodb
import bcrypt
from bson import ObjectId
from datetime import datetime, timedelta


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
        try:
            user = await mongodb.db["users"].find_one({"username": username})
            print("Login user:", user)  # Debug
            
            if not user:
                raise HTTPException(status_code=401, detail="Invalid username or password")

            if not bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8")):
                raise HTTPException(status_code=401, detail="Invalid username or password")

            # Tạo session và lưu vào cookie
            session_id = await SessionManager.create_session(user_id=str(user["_id"]), response=response)
            print("Created session:", session_id)  # Debug
            
            # Đảm bảo cookie được set
            response.set_cookie(
                key="session_id",
                value=session_id,
                httponly=True,
                samesite='lax',
                secure=False  # Set to True in production with HTTPS
            )
            
            return {
                "message": "Login successful",
                "session_id": session_id,
                "user_id": str(user["_id"]),
                "role": user.get("role"),
                "username": user.get("username")
            }
        except Exception as e:
            print("Login error:", str(e))  # Debug
            raise

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

    @staticmethod
    async def get_all_users():
        try:
            users = []
            cursor = mongodb.db["users"].find({}, {
                "password": 0  # Không trả về password
            })
            async for user in cursor:
                user["_id"] = str(user["_id"])
                users.append(user)
            return users
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def update_user_role(user_id: str, new_role: str):
        try:
            if not ObjectId.is_valid(user_id):
                raise HTTPException(status_code=400, detail="Invalid user ID")

            # Kiểm tra role hợp lệ
            valid_roles = ["user", "admin"]
            if new_role not in valid_roles:
                raise HTTPException(status_code=400, detail="Invalid role")

            result = await mongodb.db["users"].update_one(
                {"_id": ObjectId(user_id)},
                {"$set": {"role": new_role}}
            )

            if result.modified_count == 0:
                raise HTTPException(status_code=404, detail="User not found")

            return {"message": "User role updated successfully"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def delete_user(user_id: str):
        try:
            if not ObjectId.is_valid(user_id):
                raise HTTPException(status_code=400, detail="Invalid user ID")

            # Kiểm tra xem user có tồn tại không
            user = await mongodb.db["users"].find_one({"_id": ObjectId(user_id)})
            if not user:
                raise HTTPException(status_code=404, detail="User not found")

            # Không cho phép xóa admin cuối cùng
            if user.get("role") == "admin":
                admin_count = await mongodb.db["users"].count_documents({"role": "admin"})
                if admin_count <= 1:
                    raise HTTPException(
                        status_code=400, 
                        detail="Cannot delete the last admin user"
                    )

            # Xóa user
            result = await mongodb.db["users"].delete_one({"_id": ObjectId(user_id)})

            # Xóa các dữ liệu liên quan
            await mongodb.db["orders"].delete_many({"user_id": user_id})
            await mongodb.db["carts"].delete_many({"user_id": user_id})

            return {"message": "User deleted successfully"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @staticmethod
    async def get_user_statistics():
        try:
            total_users = await mongodb.db["users"].count_documents({})
            admin_users = await mongodb.db["users"].count_documents({"role": "admin"})
            normal_users = await mongodb.db["users"].count_documents({"role": "user"})

            # Thống kê user theo thời gian (ví dụ: 7 ngày gần nhất)
            seven_days_ago = datetime.utcnow() - timedelta(days=7)
            new_users = await mongodb.db["users"].count_documents({
                "created_at": {"$gte": seven_days_ago}
            })

            return {
                "total_users": total_users,
                "admin_users": admin_users,
                "normal_users": normal_users,
                "new_users_last_7_days": new_users
            }
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))