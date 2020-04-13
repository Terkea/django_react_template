import React from 'react'
import { List, Avatar, Typography } from 'antd';


const { Title } = Typography;

const data = [
    {
        title: 'Update Password',
        description: "This link Opens a pop-up that lets you update your password (no, it doesn't, lmao)",
        content: <a href="https://www.youtube.com">link</a>
    },
    {
        title: 'Go to youtube',
        description: "This link takes you to youtube",
        content: <a href="https://www.youtube.com">link</a>
    },
    {
        title: 'Go to youtube',
        description: "This link takes you to youtube",
        content: <a href="https://www.youtube.com">link</a>
    },
    {
        title: 'Go to youtube',
        description: "This link takes you to youtube",
        content: <a href="https://www.youtube.com">link</a>
    },
];




export default function Security() {
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
                        <div>{item.content}</div>
                    </List.Item>
                )}
            />

        </div >
    )
}
