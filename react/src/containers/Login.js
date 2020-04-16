import React, { useEffect, useState } from 'react';
import { Form, Input, Button, notification, Row, Col, Typography, Steps, AutoComplete, Spin } from 'antd';
import {
  LoadingOutlined,
  UserOutlined,
  RocketOutlined,
  MailOutlined,
  ToolOutlined,
  SmileOutlined,
  FileDoneOutlined,
  CloseCircleOutlined
} from '@ant-design/icons';

import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom'
import * as actions from '../store/actions/user'; //this works like a namespace


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



const Login = (props) => {
  const [current, setCurrent] = useState(0);
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

  const [email_form] = Form.useForm();
  const [token_form] = Form.useForm();


  const onFinishEmail = values => {
    props.sendLoginCode(values.email)
    setCurrent(current + 1)
  }

  const onFinishToken = values => {
    props.validateLoginCode(props.email, values.token);
  }

  const steps = [
    {
      title: 'Email',
      icon: <UserOutlined />,
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
          <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
            Request token
          </Button>
        </Form>
      ),
    },
    {
      title: 'Token',
      icon: (props.loading) ? ((props.error) ? <CloseCircleOutlined /> : <LoadingOutlined />) : (< FileDoneOutlined />),
      error: (props.error) ? "error" : "",
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
          <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
            Validate Token
          </Button>
        </Form >
      ),
    },
    {
      title: 'Login',
      icon: <SmileOutlined />,
      content: (
        <div align="middle">
          <Title level={4} style={{ marginBottom: '30px' }} >Welcome back, we'll redirect you to the homepage in one moment.</Title>
          <Spin justify="center" align="middle" />
          {/* execute the following only if the current step is login, which is has 2 as index value */}
          {/* for some reason i cant get rid of the timeoutid */}
          {current === 2 ? (setTimeout(() => props.history.push('/'), 3000)) : null}
        </div>
      ),
    },
  ];

  useEffect(() => {
    // if theres a token go to the login step
    if (localStorage.getItem('token')) {
      setCurrent(2)
    }

    if (props.error) {
      if (Array.isArray(props.error)) {
        let i;
        for (i in props.error) {
          notification.error({
            message: "Error",
            description: props.error[i],
            duration: 10,
          });
        }
      } else {
        notification.error({
          message: "Error",
          description: props.error,
          duration: 10,
        });
      }
    }
  })



  return (
    <div style={styles.svgBackground}>
      <Row type="flex" justify="center" align="middle" style={styles.heightForTheRow}>
        <Col xs={16} sm={6}>
          <RocketOutlined style={styles.logo} />
          <Title align="middle" style={styles.titleStyle}>Login</Title>
          <div>
            <Steps current={current}>
              {console.log((props.error) ? "error" : "")}
              {steps.map(item => (
                <Step key={item.title} title={item.title} icon={item.icon} status={item.error} description={item.description} />
              ))}
            </Steps>
            {/* incase theres no error and the token is valid, pass */}
            {/* {current == 2 && localStorage.getItem('token') ? setCurrent(3) : null} */}
            {/* make the steps more dynamic https://ant.design/components/steps/ */}
            <div className="steps-content" style={{ marginTop: '30px' }}>{steps[current].content}</div>
          </div>

        </Col>
      </Row>
    </div >
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    error: state.user.error,
    email: state.user.payload.email,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // add the email to the state till the token is send over the email provided
    sendLoginCode: (email) => dispatch(actions.authSendLoginCode(email)),
    validateLoginCode: (email, loginCode) => dispatch(actions.authValidateLogin(email, loginCode)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));