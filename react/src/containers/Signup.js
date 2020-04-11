import React, { useState } from 'react';
import { Form, Input, Button, Col, AutoComplete, Row, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, RocketOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import { NavLink, withRouter, Redirect } from 'react-router-dom'
import * as actions from '../store/actions/auth'; //this works like a namespace

const { Title } = Typography;

const styles = {
    heightForTheRow: {
        minHeight: '100%',
        background: 'rgba(220, 220, 220, 0.2)'
    },
    titleStyle: {
        marginBottom: '10px'
    },
    errorMessage: {
        marginBottom: '10px'
    },
    logo: {
        fontSize: '100px',
        width: '100%',
        marginBottom: '30px'
    },
    svgBackground: {
        backgroundImage: "url(" + 'https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 110px',
        backgroundSize: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'auto'
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

    // in case theres a token in localstorage that means the users is logged in
    if (localStorage.getItem('token')) {
        return <Redirect to='/' />
    }

    return (
        <div style={styles.svgBackground}>
            <Row type="flex" justify="center" align="middle" style={styles.heightForTheRow} >
                <Col xs={16} sm={6}>
                    <RocketOutlined style={styles.logo} />
                    <Title justify="center" align="middle" style={styles.titleStyle}>Register</Title>

                    {/* display the errors if there are any*/}
                    {props.error
                        ? props.error.map((error, index) =>
                            <Alert
                                style={styles.errorMessage}
                                message={error}
                                key={index}
                                type="error"
                                showIcon />)
                        : null
                    }

                    <Form
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        scrollToFirstError
                        style={styles.formStyle}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                        >
                            <Input placeholder="Username" prefix={<UserOutlined className="site-form-item-icon" />} />
                        </Form.Item>

                        <Form.Item
                            name="email"
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
                                <Input
                                    placeholder="Email"
                                    prefix={<MailOutlined className="site-form-item-icon" />}
                                />
                            </AutoComplete>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Password"
                            />
                        </Form.Item>

                        <Form.Item
                            name="password2"
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
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Confirm password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                Create account
                        </Button>
                            or
                        <NavLink style={{ marginRight: '10px' }} to='/login/'>
                                {" "}Login
                        </NavLink>
                        </Form.Item>
                    </Form>
                </Col>
            </Row >
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.authentication.loading,
        error: state.authentication.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);