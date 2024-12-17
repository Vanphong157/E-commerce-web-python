from fastapi import APIRouter, Request, Body
from BE.controllers.productsController import ProductController
from BE.controllers.userController import SessionManager

router = APIRouter()

@router.get("/")
async def get_products():
    """
    API endpoint to get all products
    """
    return await ProductController.get_products()

@router.post("/")
async def add_product(product: dict, request: Request):
    """
    API endpoint để thêm sản phẩm mới (chỉ admin).
    """
    await SessionManager.require_admin(request)
    return await ProductController.add_product(product)

@router.put("/{product_id}")
async def update_product(product_id: str, updated_data: dict, request: Request):
    """
    API endpoint để cập nhật sản phẩm (chỉ admin).
    """
    await SessionManager.require_admin(request)
    return await ProductController.update_product(product_id, updated_data)

@router.delete("/{product_id}")
async def delete_product(product_id: str, request: Request):
    """
    API endpoint để xóa sản phẩm (chỉ admin).
    """
    await SessionManager.require_admin(request)
    return await ProductController.delete_product(product_id)

@router.get("/{product_id}")
async def get_product(product_id: str):
    """
    API endpoint to get a product by ID
    """
    return await ProductController.get_product_by_id(product_id) 