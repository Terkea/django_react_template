import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Button, Avatar, Badge, Typography, Row, Col, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom'

import * as actions from '../../../store/actions/user'; //this works like a namespace

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


const Basic = (props) => {
    // console.log(props)
    // console.log(props.profile)
    if (props.isAuthenticated) {
        return <Redirect to='/' />
    }

    const onFinish = values => {
        console.log({ "profile": values });
    };

    return (
        // for some reason if u access this page by the url it complains about null field values
        // but if u go to home then navigate here everything seems to work all right
        // i blame you for this bug
        // i've spend hours trying to debug
        // jokes aside, i believe it has something to do with the way were passing down the props
        // if u get rid of the props when initializing the component it crashes, same for mapStateToProps
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
                        <Input disabled value={props.profile.email} placeholder="Email" />
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
                        <Input value={props.profile.first_name} placeholder="First Name" />
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
                        <Input value={props.profile.last_name} placeholder="Last Name" />
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
                        <Input value={props.profile.address} placeholder="Address" />
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
                        <Input value={props.profile.postcode} placeholder="Post Code" />
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
                        <Input value={props.profile.city} placeholder="City" />
                    </Form.Item>

                    <Form.Item
                        name="mobile_phone"
                        rules={[{
                            type: "number",
                            min: 0,
                            max: 80,
                        }]}
                    >
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} value={props.profile.first_name} placeholder="Phone Number" />
                    </Form.Item>

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
        // error: state.user.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        start: () => dispatch(actions.updateProfileStart()),
        success: (new_profile) => dispatch(actions.updateProfileSuccess(new_profile)),
        // fail: (error) => dispatch(actions.updateProfileFail(error)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Basic));