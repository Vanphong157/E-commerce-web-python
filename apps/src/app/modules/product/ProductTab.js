import { Row, Tabs,Collapse,theme } from 'antd';
import React from 'react';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found:a welcome guest in many households across the world.
`;

const getItems = (panelStyle) => [
    {
      key: '1',
      label: 'Màn hình',
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '2',
      label: 'Camera trước',
      children: <p>{text}</p>,
      style: panelStyle,
    },
    {
      key: '3',
      label: 'Bộ nhớ & Lưu trữ',
      children: <p>{text}</p>,
      style: panelStyle,
    },
  ];

const TabSpec = () => {
    const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 12,
    background: "#f2f4f7",
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };
  return (
    <Collapse 
        style={{
            background: token.colorBgContainer,
        }}
        bordered={false}
        items={getItems(panelStyle)}
        defaultActiveKey={['1']} 
        onChange={onChange} />
  );
};

const onChange = (key) => {
  console.log(key);
};

const ProductTab = () => {
  const items = [
    {
      key: '1',
      label: 'Thông số kĩ thuật',
      children: <TabSpec />,
    },
    {
      key: '2',
      label: 'Bài viết đánh giá',
      children: 'Content of Tab Pane 2',
    },
  ];

  return (
    <Row
      style={{
        padding:"15px",
        marginTop: '10px',
        borderRadius: '8px',
        background: 'white',
        color: 'black',
        paddingBottom: '20px',
      }}
    >
      <Tabs style={{width:"100%"}} defaultActiveKey="1" items={items} onChange={onChange} />
    </Row>
  );
};

export default ProductTab;
