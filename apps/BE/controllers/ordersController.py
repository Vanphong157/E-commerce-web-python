from fastapi import HTTPException
from BE.database import mongodb
from bson import ObjectId
from datetime import datetime

class OrderController:
    @staticmethod
    async def create_order(order_data: dict):
        try:
            # Validate dữ liệu đầu vào
            if not order_data.get("user_id") or not order_data.get("items"):
                raise HTTPException(status_code=400, detail="Invalid order data")

            # Thêm thông tin thời gian và trạng thái
            order_data["created_at"] = datetime.utcnow()
            order_data["status"] = "pending"  # Trạng thái mặc định là chờ xử lý

            # Tính toán lại tổng tiền để đảm bảo chính xác
            total_amount = sum(item["price"] * item["quantity"] for item in order_data["items"])
            order_data["total_amount"] = total_amount + order_data.get("shipping_fee", 0)

            # Thêm đơn hàng vào database
            result = await mongodb.db["orders"].insert_one(order_data)
            
            # Xóa giỏ hàng của user sau khi đặt hàng
            await mongodb.db["carts"].delete_one({"user_id": order_data["user_id"]})

            return {
                "message": "Order created successfully",
                "order_id": str(result.inserted_id)
            }
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    async def get_user_orders(user_id: str):
        try:
            orders = []
            cursor = mongodb.db["orders"].find({"user_id": user_id}).sort("created_at", -1)
            async for order in cursor:
                order["_id"] = str(order["_id"])
                orders.append(order)
            return orders
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    async def get_order_by_id(order_id: str):
        try:
            if not ObjectId.is_valid(order_id):
                raise HTTPException(status_code=400, detail="Invalid order ID")

            order = await mongodb.db["orders"].find_one({"_id": ObjectId(order_id)})
            if not order:
                raise HTTPException(status_code=404, detail="Order not found")

            order["_id"] = str(order["_id"])
            return order
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    async def update_order_status(order_id: str, status: str):
        try:
            if not ObjectId.is_valid(order_id):
                raise HTTPException(status_code=400, detail="Invalid order ID")

            valid_statuses = ["pending", "processing", "shipping", "completed", "cancelled"]
            if status not in valid_statuses:
                raise HTTPException(status_code=400, detail="Invalid status")

            result = await mongodb.db["orders"].update_one(
                {"_id": ObjectId(order_id)},
                {"$set": {"status": status}}
            )

            if result.modified_count == 0:
                raise HTTPException(status_code=404, detail="Order not found")

            return {"message": "Order status updated successfully"}
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e)) 