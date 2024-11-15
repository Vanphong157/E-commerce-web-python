import { LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Col, Divider, Rate, Row,Modal,Flex, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React,{useState} from 'react';

const desc = ['Rất tệ', 'Tệ', 'Tạm Ổn', 'Tốt', 'Rất tốt'];

const Review = () => {
  const [txtValue, setTxtValue] = useState('');
  const [value, setValue] = useState(3);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <Row
      style={{
        marginTop: '10px',
        borderRadius: '8px',
        background: 'white',
        color: 'black',
        paddingBottom: '20px',
      }}
    >
      <Col style={{ padding: '10px', width: '100%' }}>
        <h2 style={{ fontSize: '16px', fontWeight: '700', padding: '10px' }}>
          Đánh giá Điện thoại iPhone 16 Pro Max 256GB
        </h2>
        <span
          style={{
            fontSize: '26px',
            fontWeight: '700',
            margin: '0 10px',
            color: '#ff9f00',
          }}
        >
          5{' '}
        </span>
        <Rate style={{ color: '#ff9f00' }} value={4} />
        <span style={{ marginLeft: '10px', color: '#0071e3' }}>12 đánh giá</span>
        <div style={{ width: '100%', marginLeft: '10px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '700' }}>Chị Nụ</h2>
          <Rate style={{ fontSize: '14px' }} value={4} />
          <h4 style={{ padding: '10px' }}>Rất ok nha kưng</h4>
          <div style={{ display: 'flex', margin: '0 0 10px 0' }}>
            <div style={{ width: '80px', height: '80px', marginRight: '10px' }}>
              <img
                style={{
                  height: '80px',
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
                src="https://cdn.tgdd.vn/comment/56443741/loyalty_1709221331497PNY5U.jpg"
                alt="Review Image"
              />
            </div>
            <div style={{ width: '80px', height: '80px', marginRight: '10px' }}>
              <img
                style={{
                  height: '80px',
                  width: '100%',
                  objectFit: 'cover',
                  borderRadius: '4px',
                }}
                src="https://cdn.tgdd.vn/comment/56443741/loyalty_1709221331497PNY5U.jpg"
                alt="Review Image"
              />
            </div>
          </div>

          <div>
            <button
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <LikeOutlined />
            </button>
            <span style={{ marginLeft: '10px' }}>Hữu ích</span>
            <Divider type="vertical" />
            <span style={{ fontSize: '12px', color: '#8f9bb3' }}>
              {' '}
              Từ 10 ngày trước{' '}
            </span>
          </div>
          <Divider />
        </div>

        <div>
          <div style={{ display: 'flex', flex: '1', marginTop: '10px' }}>
            <button
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
                alignItems: 'center',
                textAlign: 'center',
                padding: '10px',
                background: 'transparent',
                height: '50px',
                borderRadius: '4px',
                color: '#000',
                marginRight: '5px',
                border: '1px solid #000',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              className="hoverable"
            >
              <span
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontSize: '15px',
                  fontWeight: '500',
                  lineHeight: '15px',
                }}
              >
                Xem 12 đánh giá
              </span>
            </button>

            <button
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
                alignItems: 'center',
                textAlign: 'center',
                padding: '10px',
                background: '#0071e3',
                height: '50px',
                borderRadius: '4px',
                color: '#fff',
                marginRight: '5px',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              className="hoverable"
              onClick={showModal}
            >
              <span
                style={{
                  display: 'block',
                  textAlign: 'center',
                  fontSize: '15px',
                  fontWeight: '500',
                  lineHeight: '15px',
                }}
              >
                Viết đánh giá
              </span>
            </button>
            <Modal
              style={{textAlign:"center", fontWeight:'700'}}
              title="Đánh giá sản phẩm"
              open={open}
              onOk={handleOk}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
              width={600}
              height={1000}
            >
              <div>
                <img src="https://cdn.tgdd.vn/Products/Images/1922/235089/cao-tan-cuckoo-crp-hus1000f-150923-102634-600x600.jpg" style={{maxWidth:'100px', margin:'0 auto'}}></img>
              </div>
              <h2 style={{fontSize:"1.1rem", fontWeight:"600"}}>Nồi cơm áp suất cao tần Cuckoo 1.8 lít CRP-HUS1000F</h2>
              <Flex gap="middle" vertical style={{marginBottom:"20px"}}>
                <Rate tooltips={desc} onChange={setValue} value={value} style={{fontSize:"3rem"}}/>
                {value ? <span style={{fontSize:"1rem", fontWeight:"500"}}>{desc[value - 1]}</span> : null}
              </Flex>
              <TextArea
                value={txtValue} 
                placeholder="Mời bạn chia sẻ thêm cảm nhận ..."
                onChange={(e) => setTxtValue(e.target.value)}
                autoSize={{
                  minRows: 4,
                  maxRows: 5,
                }}>
              </TextArea>
              <Flex gap="middle" style={{marginTop:"10px"}}>
                <Input placeholder="Nhập tên" ></Input>
                <Input placeholder="Nhập số điện thoại"></Input>
              </Flex>
            </Modal>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Review;
