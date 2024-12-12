from fastapi import HTTPException
from BE.database import mongodb
from bson import ObjectId

class CategoryController:
    @staticmethod
    async def get_categories():
        """
        Fetch all categories from the database.
        """
        categories = []
        cursor = mongodb.db["categories"].find()
        async for category in cursor:
            category["_id"] = str(category["_id"])  # Convert ObjectId to string
            categories.append(category)
        return categories

    @staticmethod
    async def add_category(category: dict):
        """
        Add a new category to the database.
        """
        # Validate required fields
        if "name" not in category or "description" not in category:
            raise HTTPException(status_code=400, detail="Invalid category data")
        
        result = await mongodb.db["categories"].insert_one(category)
        return {"message": "Category added", "id": str(result.inserted_id)}

    @staticmethod
    async def update_category(category_id: str, updated_data: dict):
        """
        Update an existing category by its ID.
        """
        if not ObjectId.is_valid(category_id):
            raise HTTPException(status_code=400, detail="Invalid category ID")
        
        result = await mongodb.db["categories"].update_one(
            {"_id": ObjectId(category_id)}, {"$set": updated_data}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Category not found")
        
        return {"message": "Category updated", "id": category_id}

    @staticmethod
    async def delete_category(category_id: str):
        """
        Delete a category by its ID.
        """
        if not ObjectId.is_valid(category_id):
            raise HTTPException(status_code=400, detail="Invalid category ID")
        
        result = await mongodb.db["categories"].delete_one({"_id": ObjectId(category_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Category not found")
        
        return {"message": "Category deleted", "id": category_id}
