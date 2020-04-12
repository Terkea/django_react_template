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

const styles = {
    heightForTheRow: {
        minHeight: '80vh'
    },
    menuItem: {
        fontSize: '18px'
    }
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
                            <Link to={`${getUrl()}basic/`}>Basic Settings</Link>
                        </Menu.Item>
                        <Menu.Item style={styles.menuItem} key="2">
                            <Link to={`${getUrl()}security/`}>Security Settings</Link>
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