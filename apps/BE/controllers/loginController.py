from fastapi import HTTPException
from BE.database import mongodb
from jose import JWTError, jwt
from datetime import datetime, timedelta
from bson import ObjectId
import bcrypt

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class UserController:
    @staticmethod
    async def signup(user_data: dict):
        """
        Register a new user.
        """
        required_fields = ["username", "password", "role"]
        for field in required_fields:
            if field not in user_data:
                raise HTTPException(status_code=400, detail=f"Missing required field: {field}")

        # Validate role
        if user_data["role"] not in ["admin", "user", "guest"]:
            raise HTTPException(status_code=400, detail="Invalid role")

        # Hash password
        hashed_password = bcrypt.hashpw(user_data["password"].encode("utf-8"), bcrypt.gensalt())

        # Check if username already exists
        existing_user = await mongodb.db["users"].find_one({"username": user_data["username"]})
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already exists")

        user_data["password"] = hashed_password.decode("utf-8")
        result = await mongodb.db["users"].insert_one(user_data)
        return {"message": "User created successfully", "id": str(result.inserted_id)}

    @staticmethod
    async def login(username: str, password: str):
        """
        Authenticate a user and return a JWT token.
        """
        user = await mongodb.db["users"].find_one({"username": username})
        if not user:
            raise HTTPException(status_code=401, detail="Invalid username or password")

        # Check password
        if not bcrypt.checkpw(password.encode("utf-8"), user["password"].encode("utf-8")):
            raise HTTPException(status_code=401, detail="Invalid username or password")

        # Create JWT token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = UserController.create_access_token(
            data={"sub": username, "role": user["role"]}, expires_delta=access_token_expires
        )

        return {"access_token": access_token, "token_type": "bearer"}

    @staticmethod
    def create_access_token(data: dict, expires_delta: timedelta):
        """
        Create a JWT token with expiration.
        """
        to_encode = data.copy()
        expire = datetime.utcnow() + expires_delta
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    @staticmethod
    def verify_token(token: str):
        """
        Verify a JWT token.
        """
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            username: str = payload.get("sub")
            role: str = payload.get("role")
            if username is None or role is None:
                raise HTTPException(status_code=401, detail="Invalid token")
            return {"username": username, "role": role}
        except JWTError:
            raise HTTPException(status_code=401, detail="Invalid token")
