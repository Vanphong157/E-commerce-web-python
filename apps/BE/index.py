from fastapi import FastAPI
from BE.controllers.productsController import ProductController
from BE.database import mongodb

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    print("Starting application...")

@app.on_event("shutdown")
async def shutdown_event():
    await mongodb.close_connection()

@app.get("/")
async def root():
    return {"message": "Welcome to the MongoDB FastAPI example"}

@app.get("/products")
async def get_products():
    """
    API endpoint to get all products
    """
    return await ProductController.get_products()

@app.post("/products")
async def add_product(product: dict):
    """
    API endpoint to add a new product
    """
    return await ProductController.add_product(product)

@app.put("/products/{product_id}")
async def update_product(product_id: str, updated_data: dict):
    """
    API endpoint to update a product
    """
    return await ProductController.update_product(product_id, updated_data)

@app.delete("/products/{product_id}")
async def delete_product(product_id: str):
    """
    API endpoint to delete a product
    """
    return await ProductController.delete_product(product_id)