const handleDelete = async (productId) => {
  try {
    console.log('Deleting product with ID:', productId); // Debug log
    const response = await axios.delete(`/products/${productId}`);
    console.log('Delete response:', response); // Debug log
    
    if (response.status === 200) {
      message.success('Xóa sản phẩm thành công');
      fetchProducts(); // Refresh danh sách
    }
  } catch (error) {
    console.error('Delete error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      message.error(error.response.data.detail || 'Không thể xóa sản phẩm');
    } else {
      message.error('Không thể xóa sản phẩm');
    }
  }
}; 