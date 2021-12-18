import { Dispatch } from 'react';
import { DashboardDataDto } from '../../DataModels/DashboardDataDto';
import { initializeApp } from 'firebase/app';
import { collection, getDocs } from 'firebase/firestore/lite';
import { DashboardActionTypes } from '../../Reducers/Dashboard/DashboardReducer';
import { notification } from 'antd';
import { PageEventActionTypes } from '../../Reducers/PageEvents/PageEventsReducer';
import { db, firebaseConfig } from '../../FirebaseConfig';

initializeApp(firebaseConfig);

export const getDashboardData = (history: any) => {
    return async (dispatch: Dispatch<any>): Promise<any> => {
        const dbCollection = collection(db, 'dashboard');
        // API request to get data
        getDocs(dbCollection).then((dashboardSnapshot) => {
            const dashboardDocs: any[] = dashboardSnapshot.docs.map(doc => doc.data());
            if (dashboardDocs && dashboardDocs[0]) {
                let dashboardData: DashboardDataDto = dashboardDocs[0];
                dispatch({
                    type: DashboardActionTypes.GetData,
                    data: dashboardData
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
                    history.push('/login');
                };
            });
    };
};

export interface DashboardActionsDeclerations {
    getDashboardData(history: any): Promise<any>;
}