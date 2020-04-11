import React, { useState, Fragment } from 'react';
import { Row, Col, Typography, Divider, List, Menu } from 'antd';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import BasicSettings from './Settings/Basic';
import SecuritySettings from './Settings/Security';

import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom'
import * as actions from '../../store/actions/getProfile'; //this works like a namespace

// destructure the props
const { Title } = Typography;

const styles = {
    heightForTheRow: {
        minHeight: '80vh'
    },
    menuItem: {
        fontSize: '18px'
    }
}



const MyProfile = (props) => {
    const url = props.match.url;
    props.testing()
    return (
        <div>
            <Title justify="center" align="middle" style={styles.titleStyle}>My account</Title>
            <Row type="flex" style={styles.heightForTheRow}>
                <Router>
                    <Col span={4}>
                        <Menu
                            // onClick={handleClick}
                            style={{ width: '100%' }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                        >
                            <Menu.Item style={styles.menuItem} key="1">
                                <Link to={`${url}/basic/`}>Basic Settings</Link>
                            </Menu.Item>
                            <Menu.Item style={styles.menuItem} key="2">
                                <Link to={`${url}/security/`}>Security Settings</Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={18} style={{ width: '100%' }}>
                        <Switch>
                            {/* <Route exact path="/" component={Login} /> */}
                            <Route exact path={`${url}/basic/`} component={BasicSettings} />
                            <Route exact path={`${url}/security/`} component={SecuritySettings} />
                        </Switch>
                    </Col>
                </Router>
            </Row>
        </div>
    );
};


const mapDispatchToProps = dispatch => {
    return {
        testing: () => dispatch(actions.getProfile())
    }
}

export default connect(null, mapDispatchToProps)(MyProfile);