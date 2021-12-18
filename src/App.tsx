import React from 'react';
import { Routes, Route } from 'react-router-dom';
import "antd/dist/antd.css";
import { Spin } from 'antd';
import * as PageEventActions from './Actions/PageEvents/PageEventsActions';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Settings from './Pages/Settings/Settings';
import SideMenu from './Components/SideMenu/SideMenu';
import NotFound from './NotFound';
import { AppState } from './Reducers/ReducerCombiner';
import { connect } from 'react-redux';

interface AppProps extends PageEventActions.PageEventActionsDeclerations {
  loading?: boolean;
}

class App extends React.Component<AppProps> {

  render() {
    const { loading } = this.props;
    let currentPath = window.location.pathname;
    return (
      <Spin spinning={loading}>
      {currentPath === '/Dashboard' || currentPath === '/Settings' ? <SideMenu /> : null}
      <Routes>
          <Route path="/" element={<Login reRender={() => {this.forceUpdate();}} />}/>
          <Route path="/Login" element={<Login reRender={() => {this.forceUpdate();}} />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="*" element={<NotFound />}/>
      </Routes>
      </Spin>
    )
  }
}

const mapStateToProps = (state: AppState, props: AppProps) => {
  return {
      ...props,
      loading: state.pageEvents.loading
  };
};

export default connect(mapStateToProps)(App)
