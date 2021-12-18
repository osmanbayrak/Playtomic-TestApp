import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import pageEventsReducer from '../Reducers/PageEvents/PageEventsReducer';
import authReducer from '../Reducers/Login/LoginReducer';
import dashboardReducer from '../Reducers/Dashboard/DashboardReducer';
import settingsReducer from '../Reducers/Settings/SettingsReducer';

const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
})

export const store = configureStore({
    reducer: {
        pageEvents: pageEventsReducer,
        auth: authReducer,
        dashboard: dashboardReducer,
        settings: settingsReducer,
    },
    middleware: customizedMiddleware
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
