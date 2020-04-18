import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/user';

const { Header, Content, Footer } = Layout;

const CustomLayout = props => {
    const { pathname } = useLocation()
    const url = props.match.url;
    return (
        <Layout className="layout" style={{ minHeight: '100vh', overflow: "auto" }}>
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[pathname]}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="/">
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    {
                        props.isAuthenticated ?
                            <Menu.Item key="/my_profile/basic/">
                                <Link to="/my_profile/">My Profile</Link>
                            </Menu.Item>
                            :
                            <Menu.Item key="/login/">
                                <Link to="/login/">Login</Link>
                            </Menu.Item>
                    }
                    {
                        props.isAuthenticated ?
                            <Menu.Item key="/logout/" onClick={props.logout}>
                                Logout
                            </Menu.Item>
                            :
                            < Menu.Item key="/signup/">
                                <Link to="/signup/">Sign up</Link>
                            </Menu.Item>
                    }
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div style={{ padding: 24 }}>
                    {props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Footer
            </Footer>
        </Layout>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.authLogout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));
