'use client';
import { Button, Col, Input, InputNumber, Row, Typography } from 'antd';
import React from 'react';
import Shipping from './Shipping';
import { DeleteFilled } from '@ant-design/icons';

const plusBefore = (
  <button>
    +
  </button>
)

const minusAfter = (
  <button>
    -
  </button>
)

const discountAfter =(
  <button>
    Áp dụng
  </button>
)

const CartComponent = () => {
  const [productArr, setProductArr] = React.useState([
    {
      price: "14.490.000đ",
      nameProduct: "Smart Tivi QLED Samsung 4K 65 inch QA65Q60DAKXXV",
      quantity: 3,
      productImg: "https://cdn.nguyenkimmall.com/images/thumbnails/250/250/product/947/10057613-smart-tivi-qled-4k-65-inch-qa65q60dakxxv-1.jpg",
    },
    {
      price: "14.490.000đ",
      nameProduct: "Smart Tivi QLED Samsung 4K 65 inch QA65Q60DAKXXV",
      quantity: 3,
      productImg: "https://cdn.nguyenkimmall.com/images/thumbnails/250/250/product/947/10057613-smart-tivi-qled-4k-65-inch-qa65q60dakxxv-1.jpg",
    },
  ]);

  const handleQuantityChange = (index, newQuantity) => {
    setProductArr((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index].quantity = Math.max(newQuantity, 1); // Ensure minimum quantity is 1
      return updatedProducts;
    });
  };

  const handleRemoveProduct = (index) => {
    setProductArr((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };

  return (
    <Row style={{ maxWidth: "1200px", background: 'white', margin: "0 auto", color: "black" }}>
      <Col span={17} style={{ padding: '1rem' }}>
        <h2 className='text-xl font-medium mb-5'>Chọn địa chỉ nhận hàng</h2>
        <Shipping />
      </Col>
      <Col span={7} className='p-2' style={{ padding: '1rem' }}>
        <h2 className='text-xl font-medium mb-5'>Giỏ hàng của bạn</h2>
        {productArr.map((product, index) => (
          <div key={index} style={{ minHeight: '120px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: '1', alignItems: 'center' }}>
              <img src={product.productImg} alt={product.nameProduct} />
            </div>
            <div style={{ flex: '3', fontSize: '1rem', paddingLeft: "1rem" }}>
              <h2>{product.nameProduct}</h2>
            </div>
            <div style={{ flex: '2', fontSize: "0.9rem", textAlign: 'center', justifyContent: "space-between" }}>
              <h2 style={{ color: '#f2405d' }} className='mb-2'>{product.price}</h2>
              <InputNumber
                min={1}
                value={product.quantity}
                onChange={(value) => handleQuantityChange(index, value)}
                addonBefore={plusBefore}
                addonAfter={minusAfter}
                className='mb-2'
              />
              <button type="primary" danger onClick={() => handleRemoveProduct(index)}>
                <DeleteFilled className='mr-3' />
                Xóa
              </button>
            </div>
          </div>
        ))}
        <div className='p-2' style={{fontSize:"1rem", background:"#f3f5f7"}}>
          <div className='mb-1' style={{display:"flex", justifyContent:'space-between'}}>
            <h2>Tạm tính</h2>
            <p>1.639.000đ</p>
          </div>
          <div className='mb-1' style={{display:"flex", justifyContent:'space-between', color:"#f2405d"}}>
            <h2>Khuyến mãi</h2>
            <p>50.000đ</p>
          </div>
          <div className='mb-1' style={{display:"flex", justifyContent:'space-between'}}>
            <h2>Phí vận chuyển</h2>
            <p>10.000đ</p>
          </div>
        </div>
        <div className='mb-1 mt-1 p-3' style={{display:"flex", justifyContent:'space-between'}}>
          <h2 className='font-semibold text-xl'>Tổng tiền</h2>
          <p className='font-semibold text-xl ' style={{color:"#f2405d"}}>1.639.000đ</p>
        </div>
        <div style={{padding:'.5em', border:"1px solid #ced4da", height:'75px',borderRadius:"2px"}}>
          <Input
            size='large' 
            placeholder='Nhập mã khuyến mãi'
            addonAfter={discountAfter}
          ></Input>
          <a className='ml-2'>Tìm hiểu thêm</a>
        </div>
      </Col>
    </Row>
  );
};

export default CartComponent;