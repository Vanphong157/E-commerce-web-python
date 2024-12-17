from fastapi import HTTPException
from BE.database import mongodb
from bson import ObjectId
from BE.controllers.productsController import ProductController

class CartController:
    @staticmethod
    async def get_cart(user_id: str):
        """Lấy giỏ hàng của người dùng"""
        cart = await mongodb.db["carts"].find_one({"user_id": user_id})
        if cart:
            cart["_id"] = str(cart["_id"])
            return cart
        return {"user_id": user_id, "items": [], "total": 0}

    @staticmethod
    async def add_to_cart(user_id: str, product_id: str, quantity: int):
        """Thêm sản phẩm vào giỏ hàng"""
        if not ObjectId.is_valid(product_id):
            raise HTTPException(status_code=400, detail="Invalid product ID")

        # Kiểm tra sản phẩm có tồn tại không
        product = await mongodb.db["products"].find_one({"_id": ObjectId(product_id)})
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        cart = await mongodb.db["carts"].find_one({"user_id": user_id})
        
        if not cart:
            # Tạo giỏ hàng mới
            cart_data = {
                "user_id": user_id,
                "items": [{
                    "product_id": product_id,
                    "quantity": quantity,
                    "price": product["price"]
                }],
                "total": product["price"] * quantity
            }
            result = await mongodb.db["carts"].insert_one(cart_data)
            return {"message": "Product added to cart", "cart_id": str(result.inserted_id)}
        
        # Cập nhật giỏ hàng hiện có
        product_in_cart = False
        for item in cart["items"]:
            if item["product_id"] == product_id:
                item["quantity"] += quantity
                product_in_cart = True
                break
        
        if not product_in_cart:
            cart["items"].append({
                "product_id": product_id,
                "quantity": quantity,
                "price": product["price"]
            })
        
        # Tính lại tổng tiền
        cart["total"] = sum(item["price"] * item["quantity"] for item in cart["items"])
        
        await mongodb.db["carts"].update_one(
            {"_id": cart["_id"]},
            {"$set": cart}
        )
        return {"message": "Cart updated successfully"}

    @staticmethod
    async def update_cart_item(user_id: str, product_id: str, quantity: int):
        """Cập nhật số lượng sản phẩm trong giỏ hàng"""
        if quantity < 0:
            raise HTTPException(status_code=400, detail="Quantity cannot be negative")

        cart = await mongodb.db["carts"].find_one({"user_id": user_id})
        if not cart:
            raise HTTPException(status_code=404, detail="Cart not found")

        items = cart["items"]
        for item in items:
            if item["product_id"] == product_id:
                if quantity == 0:
                    items.remove(item)
                else:
                    item["quantity"] = quantity
                break
        else:
            raise HTTPException(status_code=404, detail="Product not found in cart")

        # Tính lại tổng tiền
        total = sum(item["price"] * item["quantity"] for item in items)
        
        await mongodb.db["carts"].update_one(
            {"_id": cart["_id"]},
            {"$set": {"items": items, "total": total}}
        )
        return {"message": "Cart updated successfully"}

    @staticmethod
    async def remove_from_cart(user_id: str, product_id: str):
        """Xóa sản phẩm khỏi giỏ hàng"""
        result = await mongodb.db["carts"].update_one(
            {"user_id": user_id},
            {"$pull": {"items": {"product_id": product_id}}}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Product not found in cart")
        
        # Cập nhật lại tổng tiền
        cart = await mongodb.db["carts"].find_one({"user_id": user_id})
        total = sum(item["price"] * item["quantity"] for item in cart["items"])
        await mongodb.db["carts"].update_one(
            {"_id": cart["_id"]},
            {"$set": {"total": total}}
        )
        
        return {"message": "Product removed from cart"}

    @staticmethod
    async def clear_cart(user_id: str):
        """Xóa toàn bộ giỏ hàng"""
        result = await mongodb.db["carts"].delete_one({"user_id": user_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Cart not found")
        return {"message": "Cart cleared successfully"} 