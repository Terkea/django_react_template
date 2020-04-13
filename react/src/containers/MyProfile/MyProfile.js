import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { Switch, Route, Link, useLocation } from 'react-router-dom';
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
    },
}

const MyProfile = (props) => {
    const getUrl = () => {
        // This function can be used to reliably get the current url with 1 slash at the end
        const inconsistentUrl = props.match.url;
        const lastUrlChar = inconsistentUrl[inconsistentUrl.length - 1];
        return ((lastUrlChar === '/') ? inconsistentUrl : (inconsistentUrl + '/'));
    }
    const { pathname } = useLocation()

    const url = getUrl();
    //paths: 
    const basicPATH = `${url}basic/`;
    const securityPATH = `${url}security/`

    return (
        <Row justify="center">
            <Col xs={24} sm={20} md={24} lg={18}>

                <Content
                    style={{
                        paddingTop: 24,
                        margin: 0,
                        minHeight: 280,
                        background: '#fff',
                    }}
                >
                    <Title justify="center" align="middle" style={styles.titleStyle}>My account</Title>
                    <Row >
                        <Col xs={24} md={7}>
                            <Menu
                                style={{ width: '100%' }}
                                selectedKeys={[pathname]}
                                mode="inline"
                            >
                                <Menu.Item style={styles.menuItem} key={basicPATH}>
                                    <Link to={basicPATH}>
                                        <div>Basic Settings</div>
                                    </Link>
                                </Menu.Item>
                                <Menu.Item style={styles.menuItem} key={securityPATH}>
                                    <Link to={securityPATH}>
                                        <div>Security Settings</div>
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </Col>
                        <Col xs={24} sm={24} md={17} lg={17} style={{ padding: '8px 40px', width: '100%' }} >
                            <Switch>
                                {/* <Route exact path="/" component={Login} /> */}
                                <Route exact path={`${getUrl()}basic/`} component={BasicSettings} />
                                <Route exact path={`${getUrl()}security/`} component={SecuritySettings} />
                            </Switch>
                        </Col>
                    </Row>
                </Content>
            </Col>
        </Row>
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
