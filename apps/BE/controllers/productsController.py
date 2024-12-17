from fastapi import HTTPException
from BE.database import mongodb
from bson import ObjectId

class ProductController:
    @staticmethod
    async def get_products():
        products = []
        cursor = mongodb.db["products"].find()
        async for product in cursor:
            product["_id"] = str(product["_id"])
            products.append(product)
        return products

    @staticmethod
    async def add_product(product: dict):
        if "name" not in product or "price" not in product:
            raise HTTPException(status_code=400, detail="Invalid product data")
        
        result = await mongodb.db["products"].insert_one(product)
        return {"message": "Product added", "id": str(result.inserted_id)}

    @staticmethod
    async def update_product(product_id: str, updated_data: dict):
        if not ObjectId.is_valid(product_id):
            raise HTTPException(status_code=400, detail="Invalid product ID")

        result = await mongodb.db["products"].update_one(
            {"_id": ObjectId(product_id)}, {"$set": updated_data}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
        
        return {"message": "Product updated", "id": product_id}

    @staticmethod
    async def delete_product(product_id: str):
        if not ObjectId.is_valid(product_id):
            raise HTTPException(status_code=400, detail="Invalid product ID")

        result = await mongodb.db["products"].delete_one({"_id": ObjectId(product_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Product not found")
        
        return {"message": "Product deleted", "id": product_id}
