'use client'
import React, { useState } from 'react';
import styled from 'styled-components';

import { Breadcrumb, Button, Col, Divider, Rate, Row } from 'antd'
import Title from 'antd/es/typography/Title'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { CheckCircleOutlined, DeliveredProcedureOutlined } from '@ant-design/icons';
import ProductImages from './ProductImages';
import ProductFlashSale from './ProductFlashSale';
import ProductInfo from './ProductInfo';
import ProductRelated from './ProductRelated';
import ProductTab from './ProductTab';
import Review from './Review';

const listImgs = [
  "https://cdn.tgdd.vn/Products/Images/7978/219538/day-da-dong-ho-l006-04-18-nau-size-18mm-2-750x500.jpg",
  'https://swiperjs.com/demos/images/nature-1.jpg',
  'https://swiperjs.com/demos/images/nature-2.jpg',
  'https://swiperjs.com/demos/images/nature-3.jpg',
  'https://swiperjs.com/demos/images/nature-4.jpg',
  'https://swiperjs.com/demos/images/nature-5.jpg',
  'https://swiperjs.com/demos/images/nature-6.jpg',
  'https://swiperjs.com/demos/images/nature-7.jpg',
  'https://swiperjs.com/demos/images/nature-8.jpg',
  'https://swiperjs.com/demos/images/nature-9.jpg',
]

const listPolicys = [
  "Giao hàng tận nhà nhanh chóng",
  "Không bảo hành, đổi trả",
]

const listFeatures = [
  "Bộ hộp đựng thực phẩm có hình chữ nhật, dung tích mỗi hộp lần lượt là 500 ml - 1000 ml - 2000 ml dùng để đựng và bảo quản thực phẩm khô, thực phẩm tươi sống hoặc thực phẩm chín.",
  "Hộp đựng thực phẩm sử dụng chất liệu nhựa PP nguyên sinh an toàn, có tính kháng khuẩn và khử mùi."
]

const listItems = [
  {
    option:"43 inch",
    price:"1.890.000đ",
  },
  {
    option:"44 inch",
    price:"1.990.000đ",
  },
  {
    option:"50 inch",
    price:"2.890.000đ",
  },
  {
    option:"53 inch",
    price:"3.890.000đ",
  },
  {
    option:"53 inch",
    price:"3.890.000đ",
  },
]

const listRelated = [
    {
      image:"https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-black-thumb-600x600.jpg",
      title:"iPhone 16 Pro Max 256GB",
      price:"34.990.000₫"
    },
    {
      image:"https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-black-thumb-600x600.jpg",
      title:"iPhone 16 Pro Max 256GB",
      price:"34.990.000₫"
    },
    {
      image:"https://cdn.tgdd.vn/Products/Images/42/329149/iphone-16-pro-max-black-thumb-600x600.jpg",
      title:"iPhone 16 Pro Max 256GB",
      price:"34.990.000₫"
    },
]

// Styled Components
const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 4px;
  border: 2px solid #fff;
  transition: border-color 0.3s, transform 0.3s;
`;

const SlideLink = styled.a`
  border: 1px solid #333;
  display: block;
  text-decoration: none;
  border-radius: 4px;
  background: #fff;
  padding: 8px 2px;
  text-align: center;
  width: 100px;
  min-height: 56px;
  color: #000;
  font-size: 14px;
  
  &:hover {
    background-color: #f0f0f0;
    border-color: #dc0021;
    color: #000;
  }
`;


const ProductPage = () => {
  const [thumbsSwiper1, setThumbsSwiper1] = useState(null);

  return (
    <>
      <Breadcrumb
        style={{ margin: '15px 0' }}
        separator=">"
        items={[
          { title: 'Trang chủ' },
          { title: 'Sản phẩm', href: '' },
          { title: 'Máy giặt' },
        ]}
      />

      <Title style={{ fontSize: '20px', fontWeight: 700, color: "#333", marginRight: "10px", lineHeight: 1.4 }}>
        Máy giặt Electrolux UltimateCare 500 Inverter 10 kg EWF1024P5WB
      </Title>

      <Row gutter={10} style={{ paddingTop: '5px', marginTop: '10px' }}>
        <Col span={15}>
          <ProductImages listImgs={listImgs}/>

          <Row style={{marginTop:'10px', borderRadius:'8px', background:'white', color:'black', paddingBottom:"10px"}} >
              <div style={{margin:"0 16px 0 16px", width:"100%"}}>
                <b style={{paddingTop:'15px', color:"#101828", fontSize:"16px", marginBottom:"15px", display:"block"}}>Điện máy xanh cam kết</b>
                <ul style={{display:"flex", flexWrap:"wrap", width:'100%'}}>
                  {
                    listPolicys.map((policy, index) => (
                    <li key={index} style={{padding:'12px 0 12px 0', width:"50%", display:"flex"}}>
                        <div style={{marginRight:"14px"}}>
                          <i><CheckCircleOutlined  style={{fontSize:'24px', color:"blue"}}/> </i>
                        </div>
                        <p>
                          {policy}
                        </p>
                      </li>
                    ))
                  }
                </ul>
              </div>
          </Row>

          <Row style={{marginTop:'10px', borderRadius:'8px', background:'white', color:'black', paddingBottom:"20px"}} >
              <div style={{margin:"0 16px 0 16px", width:"100%"}}>
                <b style={{paddingTop:'15px', color:"#101828", fontSize:"16px", marginBottom:"15px", display:"block"}}>Đặc điểm nổi bật</b>
                <ul style={{display:"flex", flexWrap:"wrap", width:'100%'}}>
                  {
                    listFeatures.map((feature, index) => (
                    <li key={index} style={{padding:'2px 0 2px 0', width:"100%", display:"flex"}}>
                        <div style={{marginRight:"14px"}}>
                          <i><CheckCircleOutlined  style={{fontSize:'5px', color:"blue"}}/> </i>
                        </div>
                        <p>
                          {feature}
                        </p>
                      </li>
                    ))
                  }
                </ul>
              </div>
          </Row>

          <ProductTab/>
          <Review/> 
        </Col>
        
        <Col span={9}>
          <Row style={{borderRadius:"8px", background:"white", padding:"8px", color:'black'}}>
            <div style = {{ display:"block", width:"100%"}}>
              <ProductInfo/>

              <div>
                <div className="product-pick-item" style={{marginTop:"20px"}}>
                  <div style={{ padding:'0 20px'}}>
                    Có <strong>7 kích thước.</strong>
                    Bạn đang chọn <strong>55 inch</strong>
                  </div>
                  <div>

                  <Swiper                  
                    thumbs={{ swiper: thumbsSwiper1 }}
                    slidesPerView={1}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper3"
                  />
                  
                  <Swiper
                    style={{
                      '--swiper-navigation-color': '#333',
                      '--swiper-pagination-color': '#333',
                      '--swiper-navigation-size': '20px'
                    }}
                    onSwiper = {setThumbsSwiper1}
                    navigation={true}
                    slidesPerView={4}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper3"
                  >
                    
                     { listItems ? listItems.map((item, index) => (
                      <StyledSwiperSlide key={index}>
                        <div>
                          <SlideLink>
                            <span style={{ display: 'block' }}>{item.option}</span>
                            <span className="item-price">{item.price}</span>
                          </SlideLink>
                        </div>
                      </StyledSwiperSlide>
                    )) : <></>}
                  </Swiper>

                  </div>

                </div>
              </div>
              
              <div style={{ margin:"10px auto"}}>
                <button style={{display:'flex', flexDirection:'column', width:"calc(100% - 5px)",alignItems:"center", textAlign:'center',
                  padding:"10px", background:"#ed3324", height:"60px", borderRadius:"4px", color:"white"
                }}>
                  <span style={{display:"block", textAlign:'center', fontSize:"18px", fontWeight:"700", lineHeight:"18px", textTransform: "uppercase"}}>Mua ngay</span>
                  <span style={{display:'block', fontSize:'12px'}}>
                    Giao hàng tận nơi
                  </span>
                </button>
                <div style={{display:'flex', flex:'1', marginTop:"10px"}}>
                  <button style={{display:'flex', flexDirection:'column', width:"calc(50% -5px)",alignItems:"center", textAlign:'center',
                    padding:"10px", background:"transparent", height:"70px", borderRadius:"4px", color:"#ed3324", marginRight:'5px', border:"1px solid #ed3324", justifyContent:"center",    textTransform: "uppercase"
                  }}>
                    <span style={{display:"block", textAlign:'center', fontSize:"18px", fontWeight:"700", lineHeight:"18px"}}>Thêm vào giỏ hàng</span>           
                  </button>

                  <button style={{display:'flex', flexDirection:'column', width:"calc(50% - 7px)",alignItems:"center", textAlign:'center',
                    padding:"10px", background:"transparent", height:"70px", borderRadius:"4px", color:"#ed3324", marginRight:'5px', border:"1px solid #ed3324", justifyContent:"center",    textTransform: "uppercase"

                  }}>
                    <span style={{display:"block", textAlign:'center', fontSize:"18px", fontWeight:"700", lineHeight:"18px"}}>mua Trả góp</span>
                    <span style={{display:'block', fontSize:'12px'}}>
                      Chỉ 10k/ tháng
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Row>
          <Row style={{borderRadius:"8px", background:"white", padding:"8px", color:'black', marginTop:"10px"}}>
            <ProductRelated listRelated={listRelated}/>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default ProductPage;
