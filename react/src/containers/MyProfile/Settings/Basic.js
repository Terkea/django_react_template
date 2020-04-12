import React from 'react';
import { Form, Input, InputNumber, Button, Avatar, Badge, Typography, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const { Title } = Typography;

const layout = {
    labelCol: {
        span: 2,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};




const Basic = () => {
    const onFinish = values => {
        console.log(values);
    };
    return (
        <Row>
            <Col xs={24} md={14}>
                <Title level={4} >Basic settings</Title>
                <Form {...layout} layout="vertical" name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'name']}
                        label="Nickname"
                        rules={[
                            {
                                type: "nickname",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'age']}
                        label="Age"
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                                max: 99,
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name={['user', 'website']} label="Website">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="Introduction">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                    </Button>
                    </Form.Item>
                </Form>
            </Col>

            <Col xs={10} md={4}>
                <Avatar shape="square" style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }} size={128} icon={<UserOutlined />} />
            </Col>
        </Row>
    )
}

export default Basic;