import React, { useState } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { List, Avatar, Typography, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import SetPassword from './components/SetPassword'
import CustomModal from '../../CustomModal'

import * as actions from '../../../store/actions/user'; //this works like a namespace

const { Title } = Typography;


const data = [
    {
        title: 'Update Password',
        description: "Current Password Strength: (this value will have to be stored when creating account)",
        clickComponent: <a>Change</a>,
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
    props.start()
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

                        <CustomModal clickComponent={item.clickComponent}>
                            {item.showComponent}
                        </CustomModal>

                    </List.Item>
                )}
            />

        </div >
    )
}

const mapDispatchToProps = dispatch => {
    return {
        start: () => dispatch(actions.updateProfileStart()),
        success: (new_profile) => dispatch(actions.updateProfileSuccess(new_profile)),
        fail: (error) => dispatch(actions.updateProfileFail(error)),
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Security));