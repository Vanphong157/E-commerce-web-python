from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordRequestForm
from BE.controllers.categoriesController import CategoryController
from BE.controllers.loginController import UserController
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

@app.post("/signup")
async def signup(user_data: dict):
    """
    Signup a new user.
    """
    return await UserController.signup(user_data)

@app.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Login a user and return a JWT token.
    """
    return await UserController.login(form_data.username, form_data.password)