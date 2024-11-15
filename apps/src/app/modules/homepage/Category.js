import { Col, Row, Typography } from 'antd'
import React from 'react'

const styleImg = {
  width:'48px',
  borderRadius: "8px",
  margin:'0 auto'
}

const styleRow = {
  color:'#1d2939',
  background:"white",
  borderRadius:"8px"
}

const styleCol = {
  padding:"16px 10px 10px",
  textAlign:'center',
}

const styleSpan = {
  width: "auto",
  fontSize: "14px",
  height: "18px",
  margin: "2px auto",
  lineHeight: "18px",
  alignContent: "center",
  textTransform:'capitalize'
}

const categoryArr = [
  {
    cateName:'máy giặt',
    cateImg:'https://cdnv2.tgdd.vn/mwg-static/common/Common/0a/b9/0ab938f5b5b2993d568351bceb721407.png'
  },
  {
    cateName:'máy giặt',
    cateImg:'https://cdnv2.tgdd.vn/mwg-static/common/Common/0a/b9/0ab938f5b5b2993d568351bceb721407.png'
  },
  {
    cateName:'máy giặt',
    cateImg:'https://cdnv2.tgdd.vn/mwg-static/common/Common/0a/b9/0ab938f5b5b2993d568351bceb721407.png'
  },
]
 
const Category = () => {
  return (
    <Row Row style={styleRow} gutter={0}>
      {categoryArr.map((cate, index) => (
        <Col key={index} style={styleCol} span={3}>
          <div style={{display:"block"}}>
            <img 
              src={cate.cateImg}
              alt="Category" 
              style={styleImg} 
            />
            
          </div>
          <span style={styleSpan}>{cate.cateName}</span>
        </Col>
      ))}      
    </Row>
  )
}

export default Category