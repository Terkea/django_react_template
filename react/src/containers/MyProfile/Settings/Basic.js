import React from 'react';
import { Form, Input, InputNumber, Button, Avatar, Badge, Typography, Row, Col, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';


const { Title } = Typography;
const { Option } = Select;

const layout = {
    labelCol: {
        span: 6,
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

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select style={{ width: 70 }}>
            <Option value="44">+44</Option>
        </Select>
    </Form.Item>
);


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
                        name={'username'}
                        rules={[
                            {
                                min: 0,
                                max: 25,
                            },
                        ]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name={'email'}
                        rules={[
                            {
                                type: 'email',
                                min: 0,
                                max: 80,
                            },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name={'first_name'}
                        rules={[
                            {
                                min: 0,
                                max: 80,
                            },
                        ]}
                    >
                        <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item
                        name={'last_name'}
                        rules={[
                            {
                                min: 0,
                                max: 80,
                            },
                        ]}
                    >
                        <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item
                        name={'address'}
                        rules={[
                            {
                                min: 0,
                                max: 80,
                            },
                        ]}
                    >
                        <Input placeholder="Address" />
                    </Form.Item>
                    <Form.Item
                        name={'postcode'}
                        rules={[
                            {
                                min: 0,
                                max: 80,
                            },
                        ]}
                    >
                        <Input placeholder="Post Code" />
                    </Form.Item>
                    <Form.Item
                        name={'city'}
                        rules={[
                            {
                                min: 0,
                                max: 80,
                            },
                        ]}
                    >
                        <Input placeholder="City" />
                    </Form.Item>
                    <Form.Item
                        name="mobile_phone"
                        rules={[{
                            type: "number",
                            min: 0,
                            max: 80,
                        }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="Phone Number" />
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