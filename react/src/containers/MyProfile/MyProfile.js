import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { BrowserRouter as Switch, Route, Link } from 'react-router-dom';
import { Row, Col, Typography, Menu, Button, Layout } from 'antd';

import BasicSettings from './Settings/Basic';
import SecuritySettings from './Settings/Security';

import * as actions from '../../store/actions/user'; //this works like a namespace


// destructure the props
const { Title } = Typography;
const { Content } = Layout;

const styles = {
    heightForTheRow: {
        minHeight: '70vh'
    },
    menuItem: {
        fontSize: '18px'
    },
    titleStyle: {
        marginBottom: '30px'
    }
}

const MyProfile = (props) => {

    const getUrl = () => {
        const inconsistentUrl = props.match.url;
        const lastUrlChar = inconsistentUrl[inconsistentUrl.length - 1];

        const url = ((lastUrlChar === '/') ? inconsistentUrl : (inconsistentUrl + '/'));

        return url;
    }

    return (
        <div>
            <Content
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: '#fff',
                }}
            >
                <Title justify="center" align="middle" style={styles.titleStyle}>My account</Title>
                <Row style={styles.heightForTheRow}>
                    <Col xs={24} md={4}>
                        <Menu
                            style={{ width: '100%' }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                        >
                            <Menu.Item style={styles.menuItem} key="1">
                                <Link to={`${getUrl()}basic/`}>
                                    <div>Basic Settings</div>
                                </Link>
                            </Menu.Item>
                            <Menu.Item style={styles.menuItem} key="2">
                                <Link to={`${getUrl()}security/`}>
                                    <div>Security Settings</div>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col xs={24} md={18} style={{padding: '8px 40px', width: '100%'}} >
                        <Switch>
                            {/* <Route exact path="/" component={Login} /> */}
                            <Route exact path={`${getUrl()}basic/`} component={BasicSettings} />
                            <Route exact path={`${getUrl()}security/`} component={SecuritySettings} />
                        </Switch>
                    </Col>
                </Row>
            </Content>
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        loading: state.user.loading,
        error: state.user.error.update_profile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        start: () => dispatch(actions.updateProfileStart()),
        success: (new_profile) => dispatch(actions.updateProfileSuccess(new_profile)),
        fail: (error) => dispatch(actions.updateProfileFail(error)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyProfile));
