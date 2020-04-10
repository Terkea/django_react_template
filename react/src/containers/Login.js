import React, { useEffect } from 'react';
import { Form, Input, Button, Spin, Row, Col, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom'
import * as actions from '../store/actions/auth'; //this works like a namespace

const { Title, Text } = Typography;

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
    errorMessage = (
      <p>Something went wrong.</p>
    )
  }

  // in case theres a token in localstorage that means the users is logged in
  if (localStorage.getItem('token')) {
    props.history.push('/');
  }

  return (
    <div>
      <Row type="flex" justify="center" align="middle" style={styles.heightForTheRow}>
        <Col span={12}>
          <Title align="middle" style={styles.titleStyle}>Login</Title>
          <Text type="danger" align="middle">{errorMessage}</Text>
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
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item orientation="center" {...styles.tailFormItemLayout}>
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