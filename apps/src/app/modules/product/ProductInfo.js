'use client';
import React from 'react';
import { Rate, Divider } from 'antd';
import ProductFlashSale from './ProductFlashSale';


const ProductInfo = ({time, total, sold}) => {
  return (
    <>
        <div >
            <Rate style ={{fontSize:"16px"}} disabled defaultValue={2}></Rate>
              </div>
              <div>
                <span style={{display:"block"}}>
                  Giá tại: <b>Thành phố</b>
                </span>
              </div>
              <Divider/>
              <ProductFlashSale/>
              
              <Divider/>

              <div className="price" style={{display:'flex', flexWrap:"wrap"}}>
                  <div className="l"  style={{flex:'1'}} >
                    <div className="info-online-price">
                      <div className="online-price" style={{fontSize: "26px",fontWeight: 700,color: "#3f3f3f",margin: 0,}}>
                        <span>
                          14.890.000đ
                        </span>
                      </div>
                      <div className="promotion-price" style={{display:'flex'}}>
                        <span style={{color:'white', fontSize: "14px", padding: "3px 6px", lineHeight: "16px", backgroundColor: "#ee1e25", borderRadius:'8px', margin:" 0 5px 0 0", textAlign:'center'}}> -25% </span>
                        <div style={{    fontSize: "14px",lineHeight: "18px",color: "#a6a6a6", margin:'3px'}}>
                          <span style={{textDecoration:"line-through"}}>
                            22.900.000đ
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{paddingRight: "4px",position: "relative",marginBottom: "3px", marginTop:"12px"}}>
                     <span style={{background:"#fff", color:"#ed3324", border:"1px solid #ed3324", borderRadius:'4px', padding:"4px"}}>
                      Trả góp 0%
                     </span>
                    </div>
                  </div>
                  
                  <div className="r" style={{flex:'1'}}> 
                    <div style={{fontSize:'15px', lineHeight:'120%', color:"#3f3f3f", fontWeight:700, margin:"6px 0"}}>
                      <p style={{marginBottom:'3px', fontSize:"16px"}}>
                        Giá sốc online `
                        <span style={{display: "inline-block",color: "#fff",fontWeight: "normal",top: "-2px",
                          position: "relative",fontStyle: "italic",fontSize: "14px",padding: "3px 6px",
                          lineHeight: "16px",backgroundColor: "#ee1e25", borderRadius:"4px"}}> -43%</span>
                      </p>
                      <p style={{ fontSize: "32px",lineHeight: "120%",color: "red",fontWeight: 700}}>
                        12.990.000đ
                      </p>
                    </div>
                  </div>
              </div>
    </>
  );
};

export default ProductInfo;
