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
          <Col span={24}>
            <Input placeholder='Số nhà / tên đường' size='large' style={inputStyle} ></Input>
            <TextArea rows={4} style={{marginTop:"1rem", maxWidth:"98%"}} placeholder='Để lại lời nhắn cho chúng tôi'>
            </TextArea>
            <h2 className='text-xl font-medium mb-5 mt-5'>Chọn hình thức thanh toán</h2>
            <div style={{ width: '100%', display: 'flex'}}>
              <Button
                size="large"
                style={{ maxWidth: '48%', flex: 1, height: '3.5rem', display: 'flex', alignItems: 'center' }}
                onClick={() => handleShippingSelection(true)}
                className='mr-5'
              >
                <Image src={qrPic} style={{width:"1.5rem"}}/>
                <h3 className="text-normal">Thanh toán băng QR</h3>
              </Button>
              <Button
                size="large"
                style={{ maxWidth: '48%', flex: 1, height: '3.5rem', display: 'flex', alignItems: 'center' }}
                onClick={() => handleShippingSelection(false)}
                
              >
                <Image src={homePic} style={{width:"1.5rem"}}/> 
                <h3 className="text-normal">Thanh toán khi nhận hàng</h3>
              </Button>
            </div>
            <div style={{width:"100%", display:"flex", marginTop:'1.5rem'}}>
              <Button  size="large"
                  style={{ maxWidth: '98%', flex: 1, height: '4rem', display: 'flex', alignItems: 'center', background:"red", color:"white" }}>
                <h3 className="text-2xl font-bold">Thanh toán</h3>
              </Button>
            </div>
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