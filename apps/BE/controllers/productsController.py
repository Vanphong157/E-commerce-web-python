from fastapi import HTTPException
from BE.database import mongodb

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