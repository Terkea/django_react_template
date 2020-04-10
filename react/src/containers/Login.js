import React, { useEffect } from 'react';
import { Form, Input, Button, Spin, Row, Col, Typography, Alert } from 'antd';
import { LoadingOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom'
import * as actions from '../store/actions/auth'; //this works like a namespace

const { Title, Text } = Typography;

const styles = {
  heightForTheRow: {
    minHeight: '80vh',
  },
  titleStyle: {
    marginBottom: '10px'
  },
  errorMessage: {
    marginBottom: '10px'
  }
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Login = (props) => {

  const onFinish = values => {
    props.onAuth(values.username, values.password)
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  let errorMessage = null;
  if (props.error) {
    errorMessage = 'Invalid username or password.'
  }

  // in case theres a token in localstorage that means the users is logged in
  if (localStorage.getItem('token')) {
    props.history.push('/');
  }

  return (
    <div>
      <Row type="flex" justify="center" align="middle" style={styles.heightForTheRow}>
        <Col xs={24} sm={6}>
          <Title align="middle" style={styles.titleStyle}>Login</Title>

          {errorMessage ?
            <Alert style={styles.errorMessage} message={errorMessage} type="error" showIcon /> :
            null}

          {props.loading ?
            <Spin indicator={antIcon} />
            :
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input placeholder="Username" prefix={<UserOutlined className="site-form-item-icon" />} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password placeholder="Password" prefix={<LockOutlined className="site-form-item-icon" />} />
              </Form.Item>

              <Form.Item orientation="center">
                <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                  Login
                </Button>
                or
                <NavLink style={{ marginRight: '10px' }} to='/signup/'>
                  {" "}Register
                </NavLink>
              </Form.Item>

            </Form>
          }
        </Col>
      </Row>
    </div>
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
    onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));