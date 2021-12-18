import React from 'react';
import './Dashboard.css';
import '../../index.css';
import "antd/dist/antd.css";
import { Card } from 'antd';
import { Bar, Liquid } from '@ant-design/charts';
import { UserOutlined } from '@ant-design/icons';
import { DashboardDataDto } from '../../DataModels/DashboardDataDto';
import { bindActionCreators } from 'redux';
import * as DashboardActions from '../../Actions/Dashboard/DashboardActions';
import * as PageEventsActions from '../../Actions/PageEvents/PageEventsActions';
import { connect } from 'react-redux';
import { AppState } from '../../Reducers/ReducerCombiner';

interface DashboardProps extends PageEventsActions.PageEventsActionsDeclerations, DashboardActions.DashboardActionsDeclerations {
  data: DashboardDataDto;
  collapsed: boolean;
  history: any;
};

class Dashboard extends React.Component<DashboardProps, {userName: string}> {

  constructor(props: any) {
    super(props);
    this.state = {
      userName: ''
    };
  };
  componentDidMount() {
    this.getData();
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : undefined;
    this.setState({userName: user ? user.displayName : ''});
  };

  render() {
    const { collapsed, data } = this.props;
    // Region Start #Graph Configs
    const chartConfig = {
      data: data.chartData,
      xField: 'value',
      yField: 'year',
      seriesField: 'year',
      height: 180,
    };
    const liquidConfig = {
      percent: data.liquid,
      shape: 'rect',
      outline: {
        border: 2,
        distance: 4,
      },
      wave: {
        length: 128,
      },
      height: 180,
    };
    // Region End

    return (
      <div className="Dashboard">
        <div id="header" className='contentHeader' style={{marginLeft: collapsed ? 80 : 200}}>
          <div>
            <h2 className='headerTitle'>Dashboard</h2>
          </div>
          <div className='userName'>
            <span><UserOutlined /> {this.state.userName} </span>
          </div>
        </div>
        <div className="content" style={{margin: `20px 20px 20px ${collapsed ? '20px' : '220px'}`}} id="content">
          <Card bodyStyle={{minWidth: '97px'}} className='dashboardCards'>
            <p>{data.doctors}</p>
            <p>Doctors</p>
          </Card>
          <Card bodyStyle={{minWidth: '97px'}} className='dashboardCards'>
            <p>{data.nurses}</p>
            <p>Nurses</p>
          </Card>
          <Card bodyStyle={{minWidth: '97px'}} className='dashboardCards'>
            <p>{data.patients}</p>
            <p>Patients</p>
          </Card>
          <Card bodyStyle={{minWidth: '97px'}} className='dashboardCards'>
            <p>{data.pharmacusts}</p>
            <p>Pharmacusts</p>
          </Card>
          <div className='flexBreak'></div>
          <Card className='chartCard'>
            Patients Discharged in Years
            <Bar {...chartConfig} />
          </Card>
          <Card className='chartCard'>
            Hospital Cccupancy
            <Liquid {...liquidConfig} />
          </Card>
        </div>
      </div>
    );
  };

  private getData = () => {
    this.props.toggleLoading(true);
    this.props.getDashboardData(this.props.history);
  };

};

const mapStateToProps = (state: AppState, props: DashboardProps) => {
  return {
      ...props,
      data: state.dashboard.Data,
      collapsed: state.pageEvents.collapsed,
  };
};

const mapDispatchToProps = (dispatch: any, state: any) => {
  return bindActionCreators({ ...DashboardActions, ...PageEventsActions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
