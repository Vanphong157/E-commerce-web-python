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
    async def add_to_cart(user_id: str, product_data: dict):
        try:
            # Kiểm tra sản phẩm tồn tại
            product = await mongodb.db["products"].find_one(
                {"_id": ObjectId(product_data["product_id"])}
            )
            if not product:
                raise HTTPException(status_code=404, detail="Product not found")

            # Kiểm tra giỏ hàng hiện tại của user
            cart = await mongodb.db["carts"].find_one({"user_id": user_id})
            
            if cart:
                # Cập nhật số lượng nếu sản phẩm đã có trong giỏ hàng
                product_exists = False
                for item in cart["items"]:
                    if item["product_id"] == product_data["product_id"]:
                        item["quantity"] += product_data["quantity"]
                        product_exists = True
                        break
                
                if not product_exists:
                    # Thêm sản phẩm mới vào giỏ hàng
                    cart["items"].append({
                        "product_id": product_data["product_id"],
                        "quantity": product_data["quantity"],
                        "price": product["price"],
                        "name": product["name"],
                        "image": product.get("image", "https://via.placeholder.com/300")
                    })
                
                # Cập nhật giỏ hàng
                await mongodb.db["carts"].update_one(
                    {"user_id": user_id},
                    {"$set": {"items": cart["items"]}}
                )
            else:
                # Tạo giỏ hàng mới
                cart = {
                    "user_id": user_id,
                    "items": [{
                        "product_id": product_data["product_id"],
                        "quantity": product_data["quantity"],
                        "price": product["price"],
                        "name": product["name"],
                        "image": product.get("image", "https://via.placeholder.com/300")
                    }]
                }
                await mongodb.db["carts"].insert_one(cart)

            return {"message": "Product added to cart successfully"}
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

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