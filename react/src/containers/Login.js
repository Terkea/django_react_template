import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Spin, Row, Col, Typography, Alert, Steps, message, AutoComplete } from 'antd';
import { LoadingOutlined, UserOutlined, LockOutlined, RocketOutlined, MailOutlined, ToolOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import { NavLink, withRouter, Redirect } from 'react-router-dom'
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



const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Login = (props) => {

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
    props.getEmail(values.email)
    setCurrent(current + 1)
  }

  const onFinishToken = values => {
    console.log('HERE', props.email, values.token)
    props.validateLoginCode(props.email, values.token)
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
      content: (
        <Form
          form={token_form}
          onFinish={onFinishToken}
          name="token"
        >
          <Text level={5}>Check your inbox, the token we sent will run out of time in 15 minutes.</Text>
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
            {/* incase theres no error and the token is valid, pass */}
            {/* make the steps more dynamic https://ant.design/components/steps/ */}
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
            <div className="steps-content" style={{ marginTop: '30px' }}>{steps[current].content}</div>
          </div>

        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    error: state.user.error.login,
    email: state.user.payload.email
  }
}

const mapDispatchToProps = dispatch => {
  return {

    validateLoginCode: (email, loginCode) => dispatch(actions.validateLoginCode(email, loginCode)),
    // add the email to the state till the token is send over the email provided
    getEmail: (email) => dispatch(actions.sendLoginCode(email))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));