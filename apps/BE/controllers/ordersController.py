from fastapi import HTTPException
from BE.database import mongodb
from bson import ObjectId
from datetime import datetime

class OrderController:
    @staticmethod
    async def get_orders():
        orders = []
        cursor = mongodb.db["orders"].find()
        async for order in cursor:
            order["_id"] = str(order["_id"])
            orders.append(order)
        return orders

    @staticmethod
    async def get_order_by_id(order_id: str):
        if not ObjectId.is_valid(order_id):
            raise HTTPException(status_code=400, detail="Invalid order ID")
        
        order = await mongodb.db["orders"].find_one({"_id": ObjectId(order_id)})
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        
        order["_id"] = str(order["_id"])
        return order

    @staticmethod
    async def create_order(order_data: dict):
        if "user_id" not in order_data or "products" not in order_data:
            raise HTTPException(status_code=400, detail="Invalid order data")
        
        order_data["created_at"] = datetime.utcnow()
        order_data["status"] = "pending"
        
        # Tính tổng tiền đơn hàng
        total_amount = 0
        for product in order_data["products"]:
            total_amount += product["price"] * product["quantity"]
        order_data["total_amount"] = total_amount

        result = await mongodb.db["orders"].insert_one(order_data)
        return {"message": "Order created", "id": str(result.inserted_id)}

    @staticmethod
    async def update_order_status(order_id: str, status: str):
        if not ObjectId.is_valid(order_id):
            raise HTTPException(status_code=400, detail="Invalid order ID")

        valid_statuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"]
        if status not in valid_statuses:
            raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of {valid_statuses}")

        result = await mongodb.db["orders"].update_one(
            {"_id": ObjectId(order_id)},
            {"$set": {"status": status}}
        )
        
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Order not found")
        
        return {"message": "Order status updated", "id": order_id}

    @staticmethod
    async def get_user_orders(user_id: str):
        orders = []
        cursor = mongodb.db["orders"].find({"user_id": user_id})
        async for order in cursor:
            order["_id"] = str(order["_id"])
            orders.append(order)
        return orders 