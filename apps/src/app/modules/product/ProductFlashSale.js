'use client';
import React from 'react';
import styled from 'styled-components';
import { Divider } from 'antd';

const styleCountDown = {
    width: "30px",
    height: "30px",
    borderRadius: "4px",
    backgroundColor: "#2e2e2e",
    margin: "0 5px 0 0",
    color: "#fff",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 500,
    padding: "1px 0 0",
    lineHeight:'15px'
}

const styleUnit = {
    fontSize: "10px",
    fontWeight: 400,
    display: "block",
    margin: 0,
  }

const StyleSpan = styled.span`
  &::before {
    content: "";
    width: 100%;
    height: 12px;
    border-radius: 8px;
    background-color: #d4d7d9;
    display: block;
  }
`

const ProductFlashSale = ({time, total, sold}) => {
  return (
    <>
        <div className="title-flash" style={{position:"relative"}}>
                <div style={{positon:"absolute", top:0, bottom:0, left:0, right:0, background:'rgba(0,0,0,.6)'}}></div>
                <div style={{height:'40px', background:"#fe0000", justifyContent:'space-between', alignItems:'center',display:"-webkit-flex",color: "#fff"}}>
                  <div style={{margin:"0 10px 0 0", alignItems:"center",display:"-webkit-flex"}}>
                    <h4 style={{marginLeft:'14px', fontSize: "16px", fontWeight: 500,lineHeight:"15px"}}>FLASH SALE
                      <br></br>
                      <small style={{fontSize:'12px'}}>Chỉ áp dụng 1 sản phẩm</small>
                    </h4>
                    
                  </div>

                  <div style={{margin:"0 10px 0 0", display:'-webkit-flex', alignItems:'center'}}>
                    <h4 style={{marginRight:"10px"}}>Kết thúc sau</h4>
                    <span className='hours' style={styleCountDown}>
                      13
                      <span style={styleUnit}> 
                        Giờ
                      </span>
                    </span>
                    <span className='minutes' style={styleCountDown}>
                      13
                      <span style={styleUnit}> 
                        Phút
                      </span>
                    </span>
                    <span className='seconds' style={styleCountDown}>
                      13
                      <span style={styleUnit}> 
                        Giây
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="ct-flash" style={{background:"#fff3f3", padding:"12px 10px 12px 16px"}}> 
                  <div style ={{display:"flex", alignItems:'center'}}> 
                    <StyleSpan style={{ position: "relative",width: "250px",display: "block",}}>
                      <span style={{ width:'20%',height: "12px",borderRadius: "8px",background: "#fe0000",position: "absolute",left: 0,top: 0,}}></span>
                    </StyleSpan>
                    <span style={{fontSize: "14px",  color:" #3f3f3f",  display: "block",marginLeft:"10px"}}>
                      Đã bán  <span style={{color:'#ee1e25'}}> 1</span>/5 sản phẩm
                    </span>
                  </div>
              </div>
    </>
  );
};

export default ProductFlashSale;
