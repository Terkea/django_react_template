import React, { useState, Fragment } from 'react';
import { Row, Col, Typography, Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import * as actions from '../store/actions/auth'; //this works like a namespace

// destructure the props
const { Title } = Typography;
const { SubMenu } = Menu;

const styles = {
    heightForTheRow: {
        minHeight: '80vh'
    },
    menuItem: {
        fontSize: '18px'
    }
}


const MyProfile = (props) => {
    return (
        <div>
            <Title justify="center" align="middle" style={styles.titleStyle}>My account</Title>
            <Row type="flex" style={styles.heightForTheRow}>
                <Col span={4}>
                    <Menu
                        // onClick={handleClick}
                        style={{ width: '100%' }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <Menu.Item style={styles.menuItem} key="1">Basic Settings</Menu.Item>
                        <Menu.Item style={styles.menuItem} key="2">Security Settings</Menu.Item>
                    </Menu>
                </Col>
                <Col span={20}>
                    <Fragment>
                        
                    </Fragment>
                </Col>
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = dispatch => {

}

export default connect(null, null)(MyProfile);