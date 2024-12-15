from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordRequestForm
from BE.controllers.categoriesController import CategoryController
from BE.controllers.loginController import UserController
from BE.controllers.productsController import ProductController
from BE.database import mongodb
import asyncio
from BE.controllers.ordersController import OrderController
from BE.controllers.cartController import CartController
from BE.controllers.checkoutController import CheckoutController

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

@app.get("/orders")
async def get_orders():
    """
    API endpoint để lấy tất cả đơn hàng
    """
    return await OrderController.get_orders()

@app.get("/orders/{order_id}")
async def get_order(order_id: str):
    """
    API endpoint để lấy chi tiết một đơn hàng
    """
    return await OrderController.get_order_by_id(order_id)

@app.post("/orders")
async def create_order(order_data: dict):
    """
    API endpoint để tạo đơn hàng mới
    """
    return await OrderController.create_order(order_data)

@app.put("/orders/{order_id}/status")
async def update_order_status(order_id: str, status: str):
    """
    API endpoint để cập nhật trạng thái đơn hàng
    """
    return await OrderController.update_order_status(order_id, status)

@app.get("/users/{user_id}/orders")
async def get_user_orders(user_id: str):
    """
    API endpoint để lấy tất cả đơn hàng của một người dùng
    """
    return await OrderController.get_user_orders(user_id)

@app.get("/cart/{user_id}")
async def get_cart(user_id: str):
    """
    API endpoint để lấy giỏ hàng của người dùng
    """
    return await CartController.get_cart(user_id)

@app.post("/cart/{user_id}/items")
async def add_to_cart(user_id: str, product_id: str, quantity: int):
    """
    API endpoint để thêm sản phẩm vào giỏ hàng
    """
    return await CartController.add_to_cart(user_id, product_id, quantity)

@app.put("/cart/{user_id}/items/{product_id}")
async def update_cart_item(user_id: str, product_id: str, quantity: int):
    """
    API endpoint để cập nhật số lượng sản phẩm trong giỏ hàng
    """
    return await CartController.update_cart_item(user_id, product_id, quantity)

@app.delete("/cart/{user_id}/items/{product_id}")
async def remove_from_cart(user_id: str, product_id: str):
    """
    API endpoint để xóa sản phẩm khỏi giỏ hàng
    """
    return await CartController.remove_from_cart(user_id, product_id)

@app.delete("/cart/{user_id}")
async def clear_cart(user_id: str):
    """
    API endpoint để xóa toàn bộ giỏ hàng
    """
    return await CartController.clear_cart(user_id)

@app.post("/checkout")
async def create_checkout(user_id: str, checkout_data: dict):
    """
    API endpoint để tạo checkout session
    """
    return await CheckoutController.create_checkout(user_id, checkout_data)

@app.post("/checkout/{checkout_id}/process")
async def process_payment(checkout_id: str):
    """
    API endpoint để xử lý thanh toán
    """
    return await CheckoutController.process_payment(checkout_id)

@app.get("/checkout/{checkout_id}")
async def get_checkout_status(checkout_id: str):
    """
    API endpoint để kiểm tra trạng thái checkout
    """
    return await CheckoutController.get_checkout_status(checkout_id)