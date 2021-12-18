import React from 'react';
import './Settings.css';
import '../../index.css';
import "antd/dist/antd.css";
import { UserOutlined } from '@ant-design/icons';
import { SettingsDataDto } from '../../DataModels/SettingsDataDto';
import { bindActionCreators } from 'redux';
import * as SettingsActions from '../../Actions/Settings/SettingsActions';
import * as PageEventsActions from '../../Actions/PageEvents/PageEventsActions';
import { connect } from 'react-redux';
import { AppState } from '../../Reducers/ReducerCombiner';

interface SettingsProps extends PageEventsActions.PageEventsActionsDeclerations, 
SettingsActions.SettingsActionsDeclerations {
  data: SettingsDataDto;
  collapsed: boolean;
  history: any;
};

class Settings extends React.Component<SettingsProps, {userName: string}> {

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

    return (
        <div className="Settings">
            <div id="header" className='contentHeader' style={{marginLeft: collapsed ? 80 : 200}}>
            <div>
                <h2 className='headerTitle'>Settings</h2>
            </div>
            <div className='userName'>
                <span><UserOutlined /> {this.state.userName} </span>
            </div>
            </div>
            <div className="content" style={{margin: `20px 20px 20px ${collapsed ? '20px' : '220px'}`}} id="content">
            <ul>
              <li><span className='settingLabel'>Hospital Name:</span> {data.hospitalName}</li>
              <li><span className='settingLabel'>Since:</span> {data.buildDate}</li>
              <li><span className='settingLabel'>Location:</span> {data.location}</li>
              <li><span className='settingLabel'>Status:</span> {data.isAvailable}</li>
              <li><span className='settingLabel'>Working Hours:</span> {data.workingHours}</li>
              <li><span className='settingLabel'>Contact Info:</span> {data.contactInfo}</li>
            </ul>
            </div>
        </div>
    );
  };

  private getData = () => {
    this.props.toggleLoading(true);
    this.props.getSettingsData(this.props.history);
  };

};

const mapStateToProps = (state: AppState, props: SettingsProps) => {
  return {
      ...props,
      data: state.settings.Data,
      collapsed: state.pageEvents.collapsed,
  };
};

const mapDispatchToProps = (dispatch: any, state: any) => {
  return bindActionCreators({ ...SettingsActions, ...PageEventsActions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
