import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Row, Col, Typography, Steps, AutoComplete } from 'antd';
import {
  LoadingOutlined,
  UserOutlined,
  RocketOutlined,
  MailOutlined,
  ToolOutlined,
  SmileOutlined,
  FileDoneOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';

import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import * as actions from '../store/actions/user';
import { clearNotifications, runNotifications } from '../Helpers/notificationHelpers';
import SvgBackground from '../containers/SvgBackground'

const { Title, Text } = Typography;
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
    marginTop: '30px'
  },
  logo: {
    fontSize: '100px',
    width: '100%',
    marginBottom: '30px'
  }
}

const goBackButton = {

  htmlType: "submit",
  style: {
    marginLeft: '10px',
    float: "right",
    marginTop: "10px"
  }
}

const Login = (props) => {
  const [current, setCurrent] = useState(0);
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const formTitle = (props.formTitle) ? props.formTitle : "Login";
  const formSuccessTitle = (props.formSuccessTitle) ? props.formSuccessTitle : "Login Success";

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

  const [email_form] = Form.useForm();
  const [token_form] = Form.useForm();

  const onFinishEmail = values => {
    const callbackFunction = (notificationMessage, outcome) => {
      runNotifications(notificationMessage, outcome);
      if (outcome === "SUCCESS") {
        setCurrent(1);
      }
    }
    props.resetUserState();
    props.sendLoginCode(values.email, callbackFunction)
  }

  const onFinishToken = values => {
    props.resetUserState();
    props.validateLoginCode(props.email, values.token, runNotifications);
  }

  const steps = [
    {
      title: 'Email',
      icon: (current === 0) ? ((props.error) ? <CloseCircleOutlined /> : ((props.loading) ? <LoadingOutlined /> : (< UserOutlined />))) : < UserOutlined />,
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
            <AutoComplete options={websiteOptions} onChange={onWebsiteChange} >
              <Input
                placeholder="Email"
                size={'large'}
                prefix={<MailOutlined className="site-form-item-icon" />}
              />
            </AutoComplete>
          </Form.Item>
          <Row>
            <Col sm={20} md={10}>
              <Button type="primary" htmlType="submit" style={{ marginRight: '10px', marginTop: "10px" }}>
                Request token
              </Button>
            </Col>
            <Col sm={4} md={14}>
              <Button {...goBackButton} onClick={() => { props.history.push('/') }}>
                Go Back
              </Button>
            </Col>
          </Row>
        </Form >
      ),
    },
    {
      title: 'Token',
      icon: (current === 1) ? ((props.error) ? <CloseCircleOutlined /> : ((props.loading) ? <LoadingOutlined /> : (< FileDoneOutlined />))) : < FileDoneOutlined />,
      error: (props.error && current === 1) ? "error" : "",
      content: (
        <Form
          form={token_form}
          onFinish={onFinishToken}
          name="token"
        >
          <Text align="middle" level={5}>Check your inbox, the token we sent will run out of time in 15 minutes.</Text>
          <Form.Item
            name="token"
            rules={[{ required: true, message: 'Please input your token!', whitespace: true }]}
          >
            <Input placeholder="Token" maxLength={6} size={'large'} prefix={< ToolOutlined className="site-form-item-icon" />} />
          </Form.Item>
          <Row>
            <Col sm={20} md={10}>
              <Button type="primary" htmlType="submit" style={{ marginRight: '10px', marginTop: "10px" }}>
                Validate token
              </Button>
            </Col>
            <Col sm={4} md={14}>
              <Button {...goBackButton} onClick={() => {
                props.resetUserState();
                setCurrent(0);
              }}>
                Go Back
              </Button>
            </Col>
          </Row>
        </Form >
      ),
    },
    {
      title: formSuccessTitle,
      icon: <SmileOutlined />,
      content: (
        <div align="middle">
          <Title level={4} style={{ marginBottom: '30px' }}>Welcome back, we'll redirect you to the homepage in one moment.</Title>
          <LoadingOutlined style={{ fontSize: '3em' }} />
          {/* execute the following only if the current step is login, which is has 2 as index value */}
          <div style={{ display: "none" }}>{current === 2 ? setTimeout(() => { clearNotifications(); props.history.push('/'); }, 3000) : null}</div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    // if theres a token go to the login step
    if (localStorage.getItem('token')) {
      setCurrent(2)
    }
  })

  return (
    <SvgBackground>
      <Row type="flex" justify="center" align="middle" style={styles.heightForTheRow}>
        <Col sm={14} md={14} lg={6} >
          <RocketOutlined style={styles.logo} />
          <Title align="middle" style={styles.titleStyle}>{formTitle}</Title>
          <div>
            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} icon={item.icon} status={item.error} description={item.description} />
              ))}
            </Steps>
            <div className="steps-content" style={{ marginTop: '30px' }}>{steps[current].content}</div>
          </div>

        </Col>
      </Row>
    </SvgBackground>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    error: state.user.error,
    email: state.user.payload.email,
  }
}

const mapDispatchToProps = dispatch => { // 
  return {
    sendLoginCode: (email, callback) => dispatch(actions.authSendLoginCode(email, callback)),
    validateLoginCode: (email, loginCode, callback) => dispatch(actions.authValidateLogin(email, loginCode, callback)),
    resetUserState: () => dispatch(actions.authReset()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
