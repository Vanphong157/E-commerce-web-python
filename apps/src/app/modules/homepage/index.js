import { Carousel, Col, Row } from 'antd'
import React from 'react'
import Banner from './Banner';
import Category from './Category';
import ListProduct from './ListProduct';

const HomepageComponent = () => {
    {/* Khúc này làm mấy cái banner quốc toàn nge */}
      
      {/*Khúc này làm thêm mấy cái chọn category */}
      
      {/*Khúc này mình làm sp nổi bật vs  hot sales   
    (dựa vào số lượt mua vs tiền discount cao nhất mỗi cái làm 8=12 product thôi) */}
    

    return (
        <>
            <Banner/>
            <Category/>
            <ListProduct/>
        </>
    )
}

export default HomepageComponent