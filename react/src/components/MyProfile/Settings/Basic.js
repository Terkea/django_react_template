import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Skeleton, Avatar, Upload, Badge, Typography, Row, Col, Select } from 'antd';
import { UserOutlined, UploadOutlined, InboxOutlined } from '@ant-design/icons';



import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { runNotifications } from '../../../Helpers/notificationHelpers';

import * as actions from '../../../store/actions/user';

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
        email: '${label} is not valid email!',
    },
};

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select defaultValue="44" style={{ width: 70 }}>
            <Option value="44">+44</Option>
        </Select>
    </Form.Item>
);


const normFile = e => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};

const Basic = (props) => {
    if (props.isAuthenticated) {
        return <Redirect to='/' />
    }

    const onFinish = values => {
        props.updateProfile(localStorage.getItem('token'), values, runNotifications)
    };

    return (
        <Row>
            <Col xs={24} sm={24} md={15} lg={12}>
                <Title level={4} >Basic settings</Title>
                <Form {...layout} layout="vertical" name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name={'email'}
                        rules={[
                            {
                                min: 0,
                                max: 80,
                            },
                        ]}
                    >
                        <Input disabled defaultValue={props.profile.email} placeholder="Email" />
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
                        <Input defaultValue={props.profile.first_name} placeholder="First Name" />
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
                        <Input defaultValue={props.profile.last_name} placeholder="Last Name" />
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
                        <Input defaultValue={props.profile.address} placeholder="Address" />
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
                        <Input defaultValue={props.profile.postcode} placeholder="Post Code" />
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
                        <Input defaultValue={props.profile.city} placeholder="City" />
                    </Form.Item>
                    <Form.Item
                        name="mobile_phone"
                        rules={[
                            {
                                min: 0,
                                max: 20,
                            }
                        ]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} defaultValue={props.profile.mobile_phone} placeholder="Phone Number" />
                    </Form.Item>
                    {/* disabled for now since we're not using it */}
                    {/* <Form.Item label="Upload Avatar">
                        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                            <Upload.Dragger name="files" action="/upload.do">
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            </Upload.Dragger>
                        </Form.Item>
                    </Form.Item> */}
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
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

const mapStateToProps = (state) => {
    return {
        loading: state.user.loading,
        profile: state.user.payload.profile,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateProfile: (token, profile, callback) => dispatch(actions.updateProfile(token, profile, callback))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Basic));
