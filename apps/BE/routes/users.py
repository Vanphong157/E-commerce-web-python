from fastapi import APIRouter, Body, Request
from BE.controllers.userController import UserController, SessionManager
from BE.controllers.ordersController import OrderController

router = APIRouter()

# Route thống kê (phải đặt trước route có path parameter)
@router.get("/statistics")
async def get_user_statistics(request: Request):
    """
    API endpoint để lấy thống kê về user (chỉ admin)
    """
    await SessionManager.require_admin(request)
    return await UserController.get_user_statistics()

# Route lấy tất cả users (phải đặt trước route có path parameter)
@router.get("")  # hoặc "/"
async def get_all_users(request: Request):
    """
    API endpoint để lấy danh sách tất cả user (chỉ admin)
    """
    await SessionManager.require_admin(request)
    return await UserController.get_all_users()

# Các route có path parameter
@router.get("/{user_id}")
async def get_user(user_id: str):
    """
    API endpoint để lấy thông tin user
    """
    return await UserController.get_user(user_id)

@router.put("/{user_id}/role")
async def update_user_role(user_id: str, role_data: dict = Body(...), request: Request):
    """
    API endpoint để cập nhật role của user (chỉ admin)
    """
    await SessionManager.require_admin(request)
    return await UserController.update_user_role(user_id, role_data["role"])

@router.delete("/{user_id}")
async def delete_user(user_id: str, request: Request):
    """
    API endpoint để xóa user (chỉ admin)
    """
    await SessionManager.require_admin(request)
    return await UserController.delete_user(user_id)

@router.put("/{user_id}")
async def update_user(user_id: str, user_data: dict = Body(...)):
    """
    API endpoint để cập nhật thông tin user
    """
    return await UserController.update_user(user_id, user_data)

@router.put("/{user_id}/password")
async def change_password(user_id: str, password_data: dict = Body(...)):
    """
    API endpoint để đổi mật khẩu
    """
    return await UserController.change_password(user_id, password_data)

@router.put("/{user_id}/avatar")
async def update_avatar(user_id: str, avatar_data: dict = Body(...)):
    """
    API endpoint để cập nhật avatar
    """
    return await UserController.update_avatar(user_id, avatar_data["avatar_url"])

@router.get("/{user_id}/orders")
async def get_user_orders(user_id: str):
    """
    API endpoint để lấy danh sách đơn hàng của user
    """
    return await OrderController.get_user_orders(user_id) 