import { AnyAction } from 'redux';
import { SettingsDataDto } from '../../DataModels/SettingsDataDto';

export enum SettingsActionTypes {
    GetSettingsData = 'GetSettingsData',
};

export interface SettingsState {
    Data: SettingsDataDto
}

export const initialState = {
    Data: {
        hospitalName: '',
        buildDate: '',
        founders: '',
        location: '',
        isAvailable: '',
        workingHours: '',
        contactInfo: '',
    }
};

export default function (state = initialState, action: AnyAction) {

    switch (action.type) {

        case SettingsActionTypes.GetSettingsData:
            return { ...state, Data: action.data };
        default:
            return state;
    };
};