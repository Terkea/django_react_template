import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { BrowserRouter as Switch, Route, Link } from 'react-router-dom';
import { Row, Col, Typography, Menu, Button } from 'antd';

import BasicSettings from './Settings/Basic';
import SecuritySettings from './Settings/Security';

import * as actions from '../../store/actions/user'; //this works like a namespace


// destructure the props
const { Title } = Typography;
const { Content } = Layout;

const styles = {
    heightForTheRow: {
        minHeight: '80vh'
    },
    menuItem: {
        fontSize: '18px'
    }
}

const menuPagetitle = {
    // marginBottom: '12px',
    // color: 'rgba(0, 0, 0, .85)',
    fontWeight: '500',
    // paddingLeft: 10,
    fontSize: '1em',
    // lineHeight: '28px',
}


const MyProfile = (props) => {

    const getUrl = () => {
        const inconsistentUrl = props.match.url;
        const lastUrlChar = inconsistentUrl[inconsistentUrl.length - 1];

        const url = ((lastUrlChar === '/') ? inconsistentUrl : (inconsistentUrl + '/'));

        return url;
    }

    // const profile = {
    //     profile: {
    //         pk: 12,
    //         username: 'terkea',
    //         email: '',
    //         first_name: '123',
    //         last_name: '123',
    //         address: '13',
    //         city: null,
    //         postcode: null,
    //         mobile_phone: '123',
    //         avatar: 'test'
    //     }
    // }

    // props.success(profile);


    return (
        <div>
            <Title justify="center" align="middle" style={styles.titleStyle}>My account</Title>
            <Content
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: '#fff',
                }}
            >
                <Row type="flex" style={styles.heightForTheRow}>
                    <Col span={4}>
                        <Menu
                            // onClick={handleClick}
                            style={{ width: '100%' }}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                        >
                            <Menu.Item style={styles.menuItem} key="1">
                                <Link to={`${getUrl()}basic/`}><div style={menuPagetitle}>Basic Settings</div></Link>
                            </Menu.Item>
                            <Menu.Item style={styles.menuItem} key="2">
                                <Link to={`${getUrl()}security/`}><div style={menuPagetitle}>Security Settings</div></Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={18} style={{ width: '100%' }}>
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
