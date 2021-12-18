import { Dispatch } from 'react';
import { SettingsDataDto } from '../../DataModels/SettingsDataDto';
import { initializeApp } from 'firebase/app';
import { collection, getDocs } from 'firebase/firestore/lite';
import { SettingsActionTypes } from '../../Reducers/Settings/SettingsReducer';
import { notification } from 'antd';
import { PageEventActionTypes } from '../../Reducers/PageEvents/PageEventsReducer';

const firebaseConfig = {
    apiKey: "AIzaSyC2xl3mNGQbQ7jh8An2q-3hrlIX65FXc_s",
    authDomain: "playtomic-auth-77056.firebaseapp.com",
    projectId: "playtomic-auth-77056",
    storageBucket: "playtomic-auth-77056.appspot.com",
    messagingSenderId: "1007166344297",
    appId: "1:1007166344297:web:30656113fae9349d9b66f8",
    measurementId: "G-YR1L6MQ01L"
};
initializeApp(firebaseConfig);

export const getSettingsData = (db: any, navigate: any) => {
    return async (dispatch: Dispatch<any>): Promise<any> => {
        const dbCollection = collection(db, 'dashboard');
        // API request to get data
        getDocs(dbCollection).then((settingsSnapshot) => {
            const settingsDocs: any[] = settingsSnapshot.docs.map(doc => doc.data());
            if (settingsDocs && settingsDocs[1]) {
                let settingsData: SettingsDataDto = settingsDocs[1];
                dispatch({
                    type: SettingsActionTypes.GetData,
                    data: settingsData
                });
                dispatch({
                    type: PageEventActionTypes.Loading,
                    data: false
                });
            } else {
                dispatch({
                    type: PageEventActionTypes.Loading,
                    data: false
                });
                notification['error']({
                    message: 'API Error',
                    description:
                        'No Data Was Found.',
                });
            }
        })
            .catch((error: any) => {
                dispatch({
                    type: PageEventActionTypes.Loading,
                    data: false
                });
                const errorCode = error.code;
                const errorMessage = error.message;
                notification['error']({
                    message: errorCode,
                    description:
                        errorMessage,
                });
                // If user is not authenticated, redirect to login page
                if (errorCode === 'permission-denied') {
                    navigate('/login');
                };
            });
    };
};

export interface SettingsActionsDeclerations {
    getSettingsData(db: any, navigate: any): Promise<any>;
}