'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Row } from 'antd';


const ProductImages = ({listImgs}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Row style={{backgroundColor: "#fff", padding: '10px' ,borderRadius: "8px"}}>
            <Swiper
              style={{
                '--swiper-navigation-color': '#333',
                '--swiper-pagination-color': '#333',
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              centeredSlides={true}
              className="mySwiper2"
            >
              {listImgs.map((img, index) => (
                <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img style={{width:'100%', height:"380px", objectFit:"cover"}} src={img}  />
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              onSwiper={setThumbsSwiper}        
              slidesPerView={8}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper"
            >
              {listImgs.map((img, index) => (
                <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius:"4px" }}>
                  <img src={img} style={{ maxWidth:'95%', maxHeight:"90%",borderRadius:'4px' }} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Row>
  );
};

export default ProductImages;
