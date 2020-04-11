import React, { useEffect } from 'react';
import { Form, Input, Button, Spin, Row, Col, Typography, Alert } from 'antd';
import { LoadingOutlined, UserOutlined, LockOutlined, RocketOutlined } from '@ant-design/icons';

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
  svgBackground : {
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

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Login = (props) => {

  const onFinish = values => {
    props.onAuth(values.username, values.password)
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  // in case theres a token in localstorage that means the users is logged in
  if (localStorage.getItem('token')) {
    return <Redirect to='/' />
  } 

  return (
    <div style={styles.svgBackground}>

      <Row type="flex" justify="center" align="middle" style={styles.heightForTheRow}>
        <Col xs={16} sm={6}>
          <RocketOutlined style={styles.logo} />
          <Title align="middle" style={styles.titleStyle}>Login</Title>

          {/* display the errors if there are any*/}
          {props.error
            ? <Alert style={styles.errorMessage} message={props.error} type="error" showIcon />
            : null
          }

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

              <Form.Item>
                <Row align="middle">
                  <Col span={18}>
                    <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                      Login
                  </Button>
                  or
                  <NavLink style={{ marginRight: '10px' }} to='/signup/'>
                      {" "}Register
                  </NavLink>
                  </Col>
                  <Col span={6}>
                    <NavLink to='/signup/'>{" "}Recover password?</NavLink>
                  </Col>
                </Row>
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
    loading: state.authentication.loading,
    error: state.authentication.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));