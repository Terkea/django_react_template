import React, { useState } from 'react';
import { Form, Input, Button, Col, AutoComplete, Tooltip, Row, Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import * as actions from '../store/actions/auth'; //this works like a namespace

const { Title } = Typography;

const styles = {
    heightForTheRow: {
        minHeight: '80vh'
    },
    titleStyle: {
        marginBottom: '5vh'
    },
    formItemLayout: {
        labelCol: {
            xs: {
                span: 10
            },
            md: {
                span: 6
            }
        },
        wrapperCol: {
            xs: {
                span: 10
            },
            md: {
                span: 12
            }
        },
    },
    tailFormItemLayout: {
        wrapperCol: {
            xs: {
                span: 12,
                offset: 0
            },
            sm: {
                span: 16,
                offset: 10
            },
        },
    }
}

const Signup = (props) => {
    const [form] = Form.useForm();

    const onFinish = values => {
        props.onAuth(values.username, values.email, values.password, values.password2)
    };

    const [autoCompleteResult, setAutoCompleteResult] = useState([]);

    const onWebsiteChange = value => {
        if (!value || value.search('@') !== -1) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['@gmail.com', '@hotmail.co.uk', '@hotmail.com', '@outlook.com', '@outlook.co.uk'].map(domain => `${value}${domain}`));
        }
    };

    const websiteOptions = autoCompleteResult.map(website => ({
        label: website,
        value: website,
    }));
    return (
        <Row type="flex" justify="center" align="middle" style={styles.heightForTheRow}>
            <Col span={12}>
                <Title justify="center" align="middle" style={styles.titleStyle}>Register</Title>
                <Form
                    {...styles.formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                    style={styles.formStyle}
                >
                    <Form.Item
                        name="username"
                        label={
                            <span> Nickname&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </span>
                        }
                        rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} >
                            <Input />
                        </AutoComplete>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="password2"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...styles.tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                            Signup
                        </Button>
                            or
                        <NavLink style={{ marginRight: '10px' }} to='/login/'>
                            {" "}Login
                        </NavLink>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);