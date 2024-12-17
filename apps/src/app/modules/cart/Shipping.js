import { Button, Col, Input, Row, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Image from 'next/image';
import React, { useState } from 'react';
import qrPic from '../../fonts/qr.png'
import homePic from '../../fonts/home.png'

const inputStyle = {
    width:"98%",
    margin:"1rem 0 0 0"
}


const Shipping = () => {
  const [isShipAtHome, setIsShipAtHome] = useState(true); // Descriptive variable

  const handleShippingSelection = (isAtHome) => {
    setIsShipAtHome(isAtHome);
  };

  return (
    <div>
      <div className="btn-group">
        <div style={{ width: '100%', display: 'flex' }}>
          <Button
            size="large"
            style={{ maxWidth: '49%', flex: 1, height: '3.5rem', display: 'flex', alignItems: 'center' }}
            onClick={() => handleShippingSelection(true)}
            className='mr-2'
          >
            <img src="https://cdn.tgdd.vn/Products/Images/42/329150/iphone-16-pro-max-black-thumb-200x200.jpg" alt="Delivery at Home" style={{ width: '2.5rem' }} />
            <h3 className="text-xl font-semibold">Nhận hàng tại nhà</h3>
          </Button>
          <Button
            size="large"
            style={{ maxWidth: '49%', flex: 1, height: '3.5rem', display: 'flex', alignItems: 'center' }}
            onClick={() => handleShippingSelection(false)}
            
          >
            <img src="https://cdn.tgdd.vn/Products/Images/42/329150/iphone-16-pro-max-black-thumb.jpg" alt="Pick Up at Center" style={{ width: '2.5rem' }} /> {/* Add alt text for accessibility */}
            <h3 className="text-xl">Nhận hàng tại trung tâm</h3>
          </Button>
        </div>
      </div>
      {/* Conditionally render content based on shipping selection */}
      {isShipAtHome ? (
        <Row>
          <Col span={12}>
            <Input placeholder='Họ và tên' size='large' style={inputStyle} ></Input>
            <Input placeholder='Email' size='large' style={inputStyle}></Input>
            <Input placeholder='Quận / huyện' size='large' style={inputStyle}></Input>
          </Col>
          <Col span={12}>
            <Input placeholder='Số điện thoại' size='large' style={inputStyle} ></Input>
            <Input placeholder='Tỉnh / thàn phố' size='large' style={inputStyle}></Input>
            <Input placeholder='Phường / xã' size='large' style={inputStyle}></Input>
          </Col>
         
        </Row>
      ) : (
        <Row>
          
        </Row>
      )}
    </div>
  );
};

export default Shipping;