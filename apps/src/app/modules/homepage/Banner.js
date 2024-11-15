import { Carousel, Col, Row } from 'antd'
import React from 'react'

const Banner = () => {
    
    const contentStyle = {
        margin: 0,
        height: '260px',
        color: '#fff',
        lineHeight: '260px',
        textAlign: 'center',
        background: '#364d79',
        borderRadius:'10px'
      };

      const contentStyleBanner = {
        margin: 0,
        height: '125px',
        color: '#fff',
        lineHeight: '125px',
        textAlign: 'center',
        background: '#364d79',
        borderRadius:'10px',
      
      };

    return (
        <Row style={{color:'red', marginBottom:'20px'}} gutter={10}>
            <Col span={16}>
                <Carousel arrows infinite={true} autoplay> 
                    <div>
                        <img style={contentStyle} src='//cdnv2.tgdd.vn/mwg-static/dmx/Banner/19/5a/195aa5d53370c8b5fc05c8e43704a350.png'></img>
                    </div>
                    <div>
                        <img style={contentStyle} src='//cdnv2.tgdd.vn/mwg-static/dmx/Banner/19/5a/195aa5d53370c8b5fc05c8e43704a350.png'></img>
                    </div>
                    <div>
                        <img style={contentStyle} src='//cdnv2.tgdd.vn/mwg-static/dmx/Banner/19/5a/195aa5d53370c8b5fc05c8e43704a350.png'></img>
                    </div>
                   
                 </Carousel>
            </Col>
            <Col span={8}>
                <div>
                    <div style={{marginBottom:10}}>
                        <img  style={contentStyleBanner} src='//cdnv2.tgdd.vn/mwg-static/dmx/Banner/19/5a/195aa5d53370c8b5fc05c8e43704a350.png'></img>
                    </div>
                    <div>
                        <img  style={contentStyleBanner} src='//cdnv2.tgdd.vn/mwg-static/dmx/Banner/19/5a/195aa5d53370c8b5fc05c8e43704a350.png'></img>
                    </div>
                </div>
            </Col> 
        </Row>
       
    )
}

export default Banner