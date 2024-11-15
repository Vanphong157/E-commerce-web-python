import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const ProductRelated = ({ listRelated }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>  
      <h2 style={styles.title}>Sản phẩm liên quan</h2>
      
      <Swiper
        thumbs={{ swiper: thumbsSwiper }}
        slidesPerView={1}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper3"
      />

      <Swiper
        style={swiperStyles}
        onSwiper={setThumbsSwiper}
        navigation={true}
        slidesPerView={2}
        spaceBetween={5}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper4"
      >
        {listRelated ? listRelated.map((item, index) => (
          <SwiperSlide key={index}>
            <ProductCard 
              image={item.image} 
              title={item.title} 
              price={item.price} 
            />
          </SwiperSlide>
        )) : <></>}
      </Swiper>
    </>
  );
};

const ProductCard = ({ image, title, price }) => (
  <div style={styles.productCard}>
    <img src={image} alt={title} style={styles.productImage} />
    <div>
      <p style={styles.productTitle}>{title}</p>
      <p style={styles.productPrice}>{price}</p>
    </div>
  </div>
);

const styles = {
  title: {
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "10px",
  },
  productCard: {
    display: "flex",
    border: "1px solid #eaecf0",
    borderRadius: "8px",
    overflow: "hidden",
    padding: "10px 5px",
  },
  productImage: {
    width: "66px",
    height: "auto",
    padding: "0 3px",
    margin: "auto 0",
  },
  productTitle: {
    minHeight: "40px",
    display: "-webkit-box",
    webkitLineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "rgba(16, 24, 40, 1)",
    lineHeight: "20px",
  },
  productPrice: {
    marginTop: "5px",
    color: "#dd2f2c",
    fontWeight: 700,
    webkitBoxOrient: "vertical",
    webkitLineClamp: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

const swiperStyles = {

  '--swiper-navigation-color': '#333',
  '--swiper-pagination-color': '#333',
  '--swiper-navigation-size': '25px'
};

export default ProductRelated;
