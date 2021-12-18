import { Dispatch } from 'react';
import { SettingsDataDto } from '../../DataModels/SettingsDataDto';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import { SettingsActionTypes } from '../../Reducers/Settings/SettingsReducer';
import { notification } from 'antd';
import { PageEventActionTypes } from '../../Reducers/PageEvents/PageEventsReducer';
import { firebaseConfig } from '../../FirebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getSettingsData = (history: any) => {
    return async (dispatch: Dispatch<any>): Promise<any> => {
        const dbCollection = collection(db, 'dashboard');
        // API request to get data
        getDocs(dbCollection).then((settingsSnapshot) => {
            const settingsDocs: any[] = settingsSnapshot.docs.map(doc => doc.data());
            if (settingsDocs && settingsDocs[1]) {
                let settingsData: SettingsDataDto = settingsDocs[1];
                dispatch({
                    type: SettingsActionTypes.GetSettingsData,
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
        }).catch((error: any) => {
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
                history.push('/login');
            };
        });
    };
};

export interface SettingsActionsDeclerations {
    getSettingsData(history: any): Promise<any>;
}