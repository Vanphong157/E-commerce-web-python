from fastapi import HTTPException
from BE.database import mongodb
from bson import ObjectId
from datetime import datetime
from BE.controllers.cartController import CartController
from BE.controllers.ordersController import OrderController

class CheckoutController:
    @staticmethod
    async def create_checkout(user_id: str, checkout_data: dict):
        """Tạo checkout mới"""
        # Kiểm tra giỏ hàng
        cart = await CartController.get_cart(user_id)
        if not cart or not cart.get("items"):
            raise HTTPException(status_code=400, detail="Cart is empty")

        # Validate shipping info
        required_shipping_fields = ["full_name", "address", "phone", "email"]
        shipping_info = checkout_data.get("shipping_info", {})
        if not all(field in shipping_info for field in required_shipping_fields):
            raise HTTPException(status_code=400, detail="Missing required shipping information")

        # Validate payment info
        payment_info = checkout_data.get("payment_info", {})
        if "payment_method" not in payment_info:
            raise HTTPException(status_code=400, detail="Payment method is required")

        # Tạo checkout session
        checkout_session = {
            "user_id": user_id,
            "cart_id": str(cart.get("_id")),
            "shipping_info": shipping_info,
            "payment_info": payment_info,
            "order_notes": checkout_data.get("order_notes"),
            "created_at": datetime.utcnow(),
            "status": "pending",
            "total_amount": cart.get("total", 0)
        }

        result = await mongodb.db["checkouts"].insert_one(checkout_session)
        return {
            "message": "Checkout session created",
            "checkout_id": str(result.inserted_id),
            "status": "pending"
        }

    @staticmethod
    async def process_payment(checkout_id: str):
        """Xử lý thanh toán"""
        if not ObjectId.is_valid(checkout_id):
            raise HTTPException(status_code=400, detail="Invalid checkout ID")

        checkout = await mongodb.db["checkouts"].find_one({"_id": ObjectId(checkout_id)})
        if not checkout:
            raise HTTPException(status_code=404, detail="Checkout session not found")

        # Cập nhật trạng thái checkout
        await mongodb.db["checkouts"].update_one(
            {"_id": ObjectId(checkout_id)},
            {"$set": {"status": "processing"}}
        )

        try:
            # Mô phỏng xử lý thanh toán
            # Trong thực tế, bạn sẽ tích hợp với payment gateway ở đây
            payment_successful = True

            if payment_successful:
                # Tạo đơn hàng mới
                order_data = {
                    "user_id": checkout["user_id"],
                    "products": await CheckoutController._get_cart_items(checkout["cart_id"]),
                    "shipping_info": checkout["shipping_info"],
                    "payment_info": checkout["payment_info"],
                    "total_amount": checkout["total_amount"],
                    "order_notes": checkout.get("order_notes")
                }
                
                order = await OrderController.create_order(order_data)
                
                # Xóa giỏ hàng
                await CartController.clear_cart(checkout["user_id"])
                
                # Cập nhật trạng thái checkout
                await mongodb.db["checkouts"].update_one(
                    {"_id": ObjectId(checkout_id)},
                    {"$set": {
                        "status": "completed",
                        "order_id": order["id"]
                    }}
                )
                
                return {
                    "message": "Payment processed successfully",
                    "order_id": order["id"]
                }
            else:
                raise HTTPException(status_code=400, detail="Payment processing failed")

        except Exception as e:
            # Cập nhật trạng thái checkout thành failed
            await mongodb.db["checkouts"].update_one(
                {"_id": ObjectId(checkout_id)},
                {"$set": {"status": "failed"}}
            )
            raise HTTPException(status_code=400, detail=str(e))

    @staticmethod
    async def _get_cart_items(cart_id: str):
        """Helper method để lấy thông tin sản phẩm từ giỏ hàng"""
        if not ObjectId.is_valid(cart_id):
            raise HTTPException(status_code=400, detail="Invalid cart ID")
            
        cart = await mongodb.db["carts"].find_one({"_id": ObjectId(cart_id)})
        if not cart:
            raise HTTPException(status_code=404, detail="Cart not found")
            
        return cart["items"]

    @staticmethod
    async def get_checkout_status(checkout_id: str):
        """Lấy trạng thái của checkout session"""
        if not ObjectId.is_valid(checkout_id):
            raise HTTPException(status_code=400, detail="Invalid checkout ID")

        checkout = await mongodb.db["checkouts"].find_one({"_id": ObjectId(checkout_id)})
        if not checkout:
            raise HTTPException(status_code=404, detail="Checkout session not found")

        return {
            "checkout_id": str(checkout["_id"]),
            "status": checkout["status"],
            "order_id": checkout.get("order_id")
        } 