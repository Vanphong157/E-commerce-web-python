from fastapi import APIRouter, Body, Request
from BE.controllers.ordersController import OrderController
from BE.controllers.userController import SessionManager

router = APIRouter()

@router.get("/statistics")
async def get_statistics():
    return await OrderController.get_order_statistics()

@router.get("/{order_id}")
async def get_order(order_id: str):
    return await OrderController.get_order_by_id(order_id)

@router.put("/{order_id}")
async def update_order(order_id: str, status_data: dict):
    return await OrderController.update_order_status(order_id, status_data["status"])

@router.get("/")
async def get_orders():
    return await OrderController.get_all_orders()

@router.post("/")
async def create_order(order_data: dict = Body(...)):
    """
    API endpoint để tạo đơn hàng mới
    """
    await SessionManager.require_admin(request)
    return await OrderController.create_order(order_data)

@router.get("/user/{user_id}")
async def get_user_orders(user_id: str):
    """
    API endpoint để lấy danh sách đơn hàng của user
    """
    return await OrderController.get_user_orders(user_id) 