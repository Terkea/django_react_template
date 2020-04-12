import React from 'react';
import { Form, Input, InputNumber, Button, Avatar, Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';




const layout = {
    labelCol: {
        span: 2,
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


const menuPagetitle = {
    marginBottom: '12px',
    color: 'rgba(0, 0, 0, .85)',
    fontWeight: '500',
    fontSize: '20px',
    lineHeight: '28px',
    padding: "8px 40px"
}


const Basic = () => {
    const onFinish = values => {
        console.log(values);
    };
    return (
        <React.Fragment>
            <div style={menuPagetitle}>Basic Settings</div>
            <div style={{
                float: "left",
                width: "500px",
            }}>
                <Form {...layout} layout="vertical" style={{ padding: "8px 40px", }} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'name']}
                        label="Nickname"
                        rules={[
                            {
                                type: "nickname",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'age']}
                        label="Age"
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                                max: 99,
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name={['user', 'website']} label="Website">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="Introduction">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                    </Button>
                    </Form.Item>
                </Form>
            </div>
            <div style={{
                // paddingLeft: "104px",
                // boxSizing: "border-box",
            }}>
                <Avatar shape="square" style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }} size={128} icon={<UserOutlined />} />
                <button type="button" class="ant-btn" ant-click-animating-without-extra-node="false"><span role="img" aria-label="upload" class="anticon anticon-upload"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="upload" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path></svg></span>Change avatar</button>
            </div>
        </React.Fragment>
    )
}

export default Basic;