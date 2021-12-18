import React from 'react';
import { Menu, Button, notification } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SettingOutlined,
    BarChartOutlined,
    LogoutOutlined,
  } from '@ant-design/icons';
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import * as PageEventsActions from '../../Actions/PageEvents/PageEventsActions';
import { getAuth } from 'firebase/auth';
import { AppState } from '../../Reducers/ReducerCombiner';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

interface SideMenuProps {
    history: any;
    collapsed: boolean;
    toggleCollapse?(collapsed: boolean): any;
};

class SideMenu extends React.Component<SideMenuProps> {

    render() {
        const currentPath = window.location.pathname;
        const { collapsed } = this.props;

        return (
            <div style={{ width: collapsed ? 80 : 200, float: 'left' }}>
                <Button type="primary" onClick={() => {this.props.toggleCollapse && this.props.toggleCollapse(!collapsed)}} style={{ margin: '8px 16px 8px' }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                </Button>
                <Menu
                    defaultSelectedKeys={[currentPath]}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    style={{height: '100vh'}}
                >
                    <Menu.Item onClick={() => this.props.history.push('/Dashboard')} key="/Dashboard" icon={<BarChartOutlined />}>
                        <Link to={'/Dashboard'}> Dashboard </Link>
                    </Menu.Item>
                    <Menu.Item onClick={() => this.props.history.push('/Settings')} key="/Settings" icon={<SettingOutlined />}>
                        <Link to={'/Settings'}> Settings </Link>
                    </Menu.Item>
                    <Menu.Item key="/Login" icon={<LogoutOutlined />} onClick={() => {this.onLogout();}}>
                        <span> Sign Out </span>
                    </Menu.Item>
                </Menu>
            </div>
        );
    };

    private onLogout = () => {
        const auth = getAuth();
        auth.signOut().then(() => {
            this.props.history.push('/login');
        }, (error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            notification['error']({
                message: errorCode,
                description:
                    errorMessage,
            });
        });
    };

};

const mapStateToProps = (state: AppState, props: any) => {
    return {
        ...props,
        collapsed: state.pageEvents.collapsed,
    };
  };
  
  const mapDispatchToProps = (dispatch: any, state: any) => {
    return bindActionCreators({ ...PageEventsActions }, dispatch);
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)