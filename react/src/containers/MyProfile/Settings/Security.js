import React, { useState } from 'react'
import { List, Avatar, Typography, Modal } from 'antd';


import { ExclamationCircleOutlined } from '@ant-design/icons';

import SetPassword from './components/SetPassword'
import CustomModal from '../../CustomModal'

const { Title } = Typography;


const data = [
    {
        title: 'Update Password',
        description: "Current Password Strength: (this value will have to be stored when creating account)",
        clickComponent: <a>Modify</a>,
        showComponent: <SetPassword />,
    },
    {
        title: 'Update Password',
        description: "Current Password Strength: (this value will have to be stored when creating account)",
        clickComponent: <a>Modify</a>,
        showComponent: <SetPassword />
    },
    {
        title: 'Go to youtube',
        description: "This link takes you to youtube",
        clickComponent: <a>Modify</a>,
        showComponent: <div>This will be the component to show</div>
    },
    {
        title: 'Go to youtube',
        description: "This link takes you to youtube",
        clickComponent: <a>Set</a>,
        showComponent: <div>This will be the component to show</div>
    },
    {
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
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                            title={<a href="https://ant.design">{item.title}</a>}
                            description={item.description}
                        />
                        <div>
                            <CustomModal clickComponent={item.clickComponent}>
                                <p>{item.showComponent}</p>
                            </CustomModal>
                        </div>
                    </List.Item>
                )}
            />

        </div >
    )
}

export default Security;