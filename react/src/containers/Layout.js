import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';

const { Header, Content, Footer } = Layout;

const CustomLayout = props => {
    return (
        <Layout className="layout" style={{ minHeight: '100vh', overflow: "auto" }}>
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">
                        <Link to="/">Home</Link>
                    </Menu.Item>

                    {
                        props.isAuthenticated ?
                            <Menu.Item key="2" onClick={props.logout}>
                                Logout
                        </Menu.Item>
                            :
                            <Menu.Item key="2">
                                <Link to="/login">Login</Link>
                            </Menu.Item>
                    }

                    {
                        props.isAuthenticated ?
                            null
                            :
                            < Menu.Item key="3">
                                <Link to="/signup">Sign up</Link>
                            </Menu.Item>
                    }

                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div style={{ background: '#fff', padding: 24 }}>
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
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(null, mapDispatchToProps)(CustomLayout));