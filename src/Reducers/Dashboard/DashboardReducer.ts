import { AnyAction } from 'redux';
import { DashboardDataDto } from '../../DataModels/DashboardDataDto';

export interface DashboardState {
    Data: DashboardDataDto;
}

export const initialState = {
    Data: {
        chartData: [
            {
                year: '0',
                value: 0,
            }
        ],
        liquid: 0.01,
        doctors: 0,
        patients: 0,
        nurses: 0,
        pharmacusts: 0,
    }
};

export default function (state = initialState, action: AnyAction) {

    switch (action.type) {
        case DashboardActionTypes.GetData:
            return { ...state, Data: action.data };
        default:
            return state;
    }
}

export enum DashboardActionTypes {
    GetData = 'GetData',
}