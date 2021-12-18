import { combineReducers } from 'redux';
import pageEventsReducer from '../Reducers/PageEvents/PageEventsReducer';
import authReducer from '../Reducers/Login/LoginReducer';
import dashboardReducer from '../Reducers/Dashboard/DashboardReducer';
import settingsReducer from '../Reducers/Settings/SettingsReducer';

const reducerCombiner = combineReducers({
    pageEvents: pageEventsReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    settings: settingsReducer,
});

const rootReducer = (state: any, action: any) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined;
    }
    return reducerCombiner(state, action);
};

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;