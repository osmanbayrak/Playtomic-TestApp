import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import "antd/dist/antd.css";
import { Spin } from 'antd';
import Login from './Pages/Login/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Settings from './Pages/Settings/Settings';
import SideMenu from './Components/SideMenu/SideMenu';
import NotFound from './Pages/NotFound/NotFound';
import { AppState } from './Reducers/ReducerCombiner';
import { connect } from 'react-redux';
import history from './history';

interface AppProps {
  loading?: boolean;
  showMenu?: boolean;
}

class App extends React.Component<AppProps> {

  componentDidMount() {
    history.listen( () =>  {
      this.forceUpdate();
    });
  };

  render() {
    const { loading } = this.props;
    let showSideMenu: boolean = window.location.pathname === '/Dashboard' || window.location.pathname === '/Settings';

    return (
      <Spin spinning={loading}>
      {showSideMenu ? <SideMenu collapsed={false} history={history} /> : null}
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/Login" component={Login} />
          <Route exact path="/Dashboard" component={Dashboard} />
          <Route exact path="/Settings" component={Settings} />
          <Route exact path="*" component={NotFound}/>
        </Switch>
      </Router>
      </Spin>
    )
  }
}

const mapStateToProps = (state: AppState, props: AppProps) => {
  return {
      ...props,
      loading: state.pageEvents.loading,
  };
};

export default connect(mapStateToProps)(App)
