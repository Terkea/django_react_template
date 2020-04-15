import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Spin, Row, Col, Typography, Alert, Steps, message, AutoComplete } from 'antd';
import { LoadingOutlined, UserOutlined, LockOutlined, RocketOutlined, MailOutlined, ToolOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import { NavLink, withRouter, Redirect } from 'react-router-dom'
import * as actions from '../store/actions/user'; //this works like a namespace

const { Title } = Typography;
const { Step } = Steps;


const styles = {
  heightForTheRow: {
    minHeight: '100%',
    background: 'rgba(220, 220, 220, 0.2)'
  },
  titleStyle: {
    marginBottom: '30px'
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



const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Login = (props) => {

  const [email_form] = Form.useForm();
  const [token_form] = Form.useForm();

  const onFinishEmail = values => {
    setCurrent(current + 1)
    console.log('email validated', values)
  }

  const onFinishToken = values => {
    setCurrent(current + 1)
    console.log('token validated', values)
  }

  const onFailToken = values => {
    console.log('token validation failed', values)
  }

  const steps = [
    {
      title: 'Email',
      content: (
        <Form
          form={email_form}
          onFinish={onFinishEmail}
          name="email"
        >
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
            <Input placeholder="Email" size={'large'} prefix={<MailOutlined className="site-form-item-icon" />} />
          </Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
            Request token
          </Button>
        </Form>
      ),
    },
    {
      title: 'Token',
      content: (
        <Form
          form={token_form}
          onFinish={onFinishToken}
          onFinishFailed={onFailToken}
          name="token"
        >
          <Title level={5}>Check your inbox, the token we sent will run out of time in 15 minutes.</Title>
          <Form.Item
            name="token"
            rules={[{ required: true, message: 'Please input your token!', whitespace: true }]}
          >
            <Input placeholder="Token" maxLength={6} size={'large'} prefix={< ToolOutlined className="site-form-item-icon" />} />
          </Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
            Validate Token
          </Button>
        </Form >
      ),
    },
    {
      title: 'Login',
      content: 'Last-content',
    },
  ];

  const [current, setCurrent] = useState(0);
  return (
    
    <div style={styles.svgBackground}>

      <Row type="flex" justify="center" align="middle" style={styles.heightForTheRow}>
        <Col xs={16} sm={6}>
          <RocketOutlined style={styles.logo} />
          <Title align="middle" style={styles.titleStyle}>Login</Title>

          <div>
            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content" style={{marginTop: '30px'}}>{steps[current].content}</div>
            {/* <div className="steps-action">
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => setCurrent(current+1)}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: 8 }} onClick={() => setCurrent(current - 1)}>
                  Previous
                </Button>
              )}
            </div> */}
          </div>
         
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    error: state.user.error.login
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) => dispatch(actions.authLogin(username, password)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));