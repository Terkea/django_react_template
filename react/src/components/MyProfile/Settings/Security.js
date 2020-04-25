import React, { useState } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { List, Avatar, Typography, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import SetPassword from './components/SetPassword'
import CustomModal from '../../../Helpers/CustomModal';


const { Title } = Typography;


const data = [
    {
        id: 1,
        title: 'Update Password',
        description: "Current Password Strength: (this value will have to be stored when creating account)",
        clickComponent: <a>Change</a>,
        showComponent: <SetPassword />,
    },
    {
        id: 2,
        title: 'Update Password',
        description: "Current Password Strength: (this value will have to be stored when creating account)",
        clickComponent: <a>Modify</a>,
        showComponent: <SetPassword />
    },
    {
        id: 3,
        title: 'Go to youtube',
        description: "This link takes you to youtube",
        clickComponent: <a>Modify</a>,
        showComponent: <div>This will be the component to show</div>
    },
    {
        id: 4,
        title: 'Go to youtube',
        description: "This link takes you to youtube",
        clickComponent: <a>Set</a>,
        showComponent: <div>This will be the component to show</div>
    },
    {
        id: 5,
        title: 'Go to youtube',
        description: "This link takes you to youtube",
        clickComponent: <a>View</a>,
        showComponent: <a href="https://www.youtube.com">link</a>
    },
];

const Security = (props) => {
    return (
        <div>
            <Title level={4} >Security settings</Title>
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.title}
                            description={item.description}
                        />
                        <CustomModal title={item.title} id={item.id} clickComponent={item.clickComponent}>
                            {item.showComponent}
                        </CustomModal>
                    </List.Item>
                )}
            />
        </div >
    )
}

export default Security;
