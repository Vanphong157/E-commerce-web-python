from bson import ObjectId
from fastapi import Depends, FastAPI, HTTPException, Request, Response
from fastapi.security import OAuth2PasswordRequestForm
from BE.controllers.categoriesController import CategoryController
from BE.controllers.userController import UserController, SessionManager
from BE.controllers.productsController import ProductController
from BE.database import mongodb

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    print("Starting application...")

@app.on_event("shutdown")
async def shutdown_event():
    await mongodb.close_connection()

@app.get("/")
async def root():
    return {"message": "Welcome to the MongoDB FastAPI example"}

@app.get("/products")
async def get_products():
    """
    API endpoint to get all products
    """
    return await ProductController.get_products()

@app.post("/products")
async def add_product(product: dict):
    """
    API endpoint to add a new product
    """
    return await ProductController.add_product(product)

@app.put("/products/{product_id}")
async def update_product(product_id: str, updated_data: dict):
    """
    API endpoint to update a product
    """
    return await ProductController.update_product(product_id, updated_data)

@app.delete("/products/{product_id}")
async def delete_product(product_id: str):
    """
    API endpoint to delete a product
    """
    return await ProductController.delete_product(product_id)

@app.get("/categories")
async def get_categories():
    """
    API endpoint to get all categories
    """
    return await CategoryController.get_categories()

@app.post("/categories")
async def add_category(category: dict):
    """
    API endpoint to add a new category
    """
    return await CategoryController.add_category(category)

@app.put("/categories/{category_id}")
async def update_category(category_id: str, updated_data: dict):
    """
    API endpoint to update a category
    """
    return await CategoryController.update_category(category_id, updated_data)

@app.delete("/categories/{category_id}")
async def delete_category(category_id: str):
    """
    API endpoint to delete a category
    """
    return await CategoryController.delete_category(category_id)

@app.post("/login")
async def login(user_data: dict, request: Request, response: Response):
    """
    Login và lưu session vào database.
    """
    return await UserController.login(user_data["username"], user_data["password"], request, response)

@app.post("/logout")
async def logout(request: Request):
    """
    Logout và xóa session khỏi database.
    """
    return await UserController.logout(request)

@app.get("/user")
async def get_user(request: Request):
    """
    Lấy thông tin người dùng hiện tại từ session.
    """
    session = await SessionManager.get_session(request)
    user = await mongodb.db["users"].find_one({"_id": ObjectId(session["user_id"])})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    print(f"user: {user}")
    return {"username": user["username"], "role": user["role"]}