from bson import ObjectId
from fastapi import Depends, FastAPI, HTTPException, Request, Response, Body
from fastapi.security import OAuth2PasswordRequestForm
from BE.controllers.authController import AuthController
from BE.controllers.categoriesController import CategoryController
from BE.controllers.userController import UserController, SessionManager
from BE.controllers.productsController import ProductController
from BE.database import mongodb
import asyncio
from BE.controllers.ordersController import OrderController
from BE.controllers.cartController import CartController
from BE.controllers.checkoutController import CheckoutController
from fastapi.middleware.cors import CORSMiddleware
from BE.controllers.authController import AuthController

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Thay đổi port nếu cần
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

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
    API endpoint để thêm sản phẩm mới.
    """
    return await ProductController.add_product(product)

@app.put("/products/{product_id}")
async def update_product(product_id: str, updated_data: dict):
    """
    API endpoint để cập nhật sản phẩm.
    """
    
    await SessionManager.require_admin(request)
    return await ProductController.update_product(product_id, updated_data)

@app.delete("/products/{product_id}")
async def delete_product(product_id: str):
    """
    API endpoint để xóa đơn hàng
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
   
    await SessionManager.require_admin(request)
    return await CategoryController.delete_category(category_id)

@app.post("/signup")
async def signup(user_data: dict):
    """
    API đăng ký người dùng.
    """
    return await UserController.signup(user_data)

@app.post("/login")
async def login( request: Request, response: Response):
    """
    Login và lưu session vào database.
    """
    data = await request.json()
    username =  data.get("username")
    password = data.get("password")

    return await UserController.login( username, password , response)

@app.post("/logout")
async def logout(request: Request):
    """
    Logout và xóa session khỏi database.
    """
    return await UserController.logout(request)

@app.get("/users")
async def get_users():
    """
    API endpoint để lấy danh sách tất cả user
    """
    try:
        users = []
        cursor = mongodb.db["users"].find({}, {
            "password": 0  # Không trả về password
        })
        async for user in cursor:
            # Chuyển đổi ObjectId thành string
            user["_id"] = str(user["_id"])
            # Đảm bảo các trường cần thiết tồn tại
            user_data = {
                "_id": user["_id"],
                "username": user.get("username", ""),
                "email": user.get("email", ""),
                "phone": user.get("phone", ""),
                "role": user.get("role", "user"),
                "created_at": user.get("created_at", None)
            }
            users.append(user_data)
            
        print("Users data:", users)  # Debug
        return users
    except Exception as e:
        print("Error getting users:", str(e))
        raise HTTPException(status_code=500, detail="Could not fetch users")

@app.get("/orders/statistics")
async def get_statistics():
    return await OrderController.get_order_statistics()

@app.get("/orders/{order_id}")
async def get_order(order_id: str):
    return await OrderController.get_order_by_id(order_id)

@app.put("/orders/{order_id}")
async def update_order(order_id: str, status_data: dict):
    """
    API endpoint để cập nhật trạng thái đơn hàng
    """
    return await OrderController.update_order_status(order_id, status_data["status"])

@app.get("/orders")
async def get_orders():
    return await OrderController.get_all_orders()

@app.post("/orders")
async def create_order(order_data: dict = Body(...)):
    """
    API endpoint để tạo đơn hàng mới
    """
    return await OrderController.create_order(order_data)

@app.get("/users/{user_id}/orders")
async def get_user_orders(user_id: str):
    """
    API endpoint để lấy danh sách đơn hàng của user
    """
    
    return await OrderController.get_user_orders(user_id)

@app.get("/cart/{user_id}")
async def get_cart(user_id: str):
    """
    API endpoint để lấy giỏ hàng của người dùng
    """
    return await CartController.get_cart(user_id)

@app.post("/cart/{user_id}/items")
async def add_to_cart(user_id: str, product_data: dict = Body(...)):
    """
    API endpoint để thêm sản phẩm vào giỏ hàng
    """
    return await CartController.add_to_cart(user_id, product_data)

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

@app.get("/products/{product_id}")
async def get_product(product_id: str):
    """
    API endpoint to get a product by ID
    """
    return await ProductController.get_product_by_id(product_id)

@app.post("/auth/register")
async def register(user_data: dict = Body(...)):
    return await AuthController.register(user_data)

@app.post("/auth/login")
async def login(credentials: dict = Body(...)):
    return await AuthController.login(credentials)

@app.get("/users/{user_id}")
async def get_user(user_id: str):
    """
    API endpoint để lấy thông tin user
    """
    return await UserController.get_user(user_id)

@app.put("/users/{user_id}")
async def update_user(user_id: str, user_data: dict = Body(...)):
    """
    API endpoint để cập nhật thông tin user
    """
    return await UserController.update_user(user_id, user_data)

@app.put("/users/{user_id}/password")
async def change_password(user_id: str, password_data: dict = Body(...)):
    """
    API endpoint để đổi mật khẩu
    """
    return await UserController.change_password(user_id, password_data)

@app.put("/users/{user_id}/avatar")
async def update_avatar(user_id: str, avatar_data: dict = Body(...)):
    """
    API endpoint để cập nhật avatar
    """
    return await UserController.update_avatar(user_id, avatar_data["avatar_url"])

@app.delete("/orders/{order_id}")
async def delete_order(order_id: str):
    """
    API endpoint để xóa đơn hàng
    """
    return await OrderController.delete_order(order_id)

@app.delete("/users/{user_id}")
async def delete_user(user_id: str):
    """
    API endpoint để xóa user
    """
    try:
        if not ObjectId.is_valid(user_id):
            raise HTTPException(status_code=400, detail="Invalid user ID")

        # Kiểm tra user có tồn tại không
        user = await mongodb.db["users"].find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Xóa user
        result = await mongodb.db["users"].delete_one({"_id": ObjectId(user_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Xóa các dữ liệu liên quan
        await mongodb.db["orders"].delete_many({"user_id": user_id})
        await mongodb.db["carts"].delete_many({"user_id": user_id})

        return {"message": "User deleted successfully"}
    except Exception as e:
        print("Error deleting user:", str(e))
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))
