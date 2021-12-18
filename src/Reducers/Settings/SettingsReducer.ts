import { AnyAction } from 'redux';
import { SettingsDataDto } from '../../DataModels/SettingsDataDto';

export interface SettingsState {
    settingsData: SettingsDataDto
}

export const initialState = {
    settingsData: {
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

        case SettingsActionTypes.GetData:
            return { ...state, Data: action.data };
        default:
            return state;
    }
}

export enum SettingsActionTypes {
    GetData = 'GetData',
}