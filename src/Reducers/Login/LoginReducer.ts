import { AnyAction } from 'redux';
import { userInfoDto } from '../../DataModels/LoginDataDto';

export interface LoginState {
    userInfo: userInfoDto
}

export const initialState = {
    userInfo: {
        displayName: "",
        email: "",
        expiresIn: "",
        idToken: "",
        kind: "",
        localId: "",
        refreshToken: "",
        registered: false
    }
};

export default function (state = initialState, action: AnyAction) {

    switch (action.type) {

        case LoginActionTypes.Signin:
            return { ...state, userInfo: action.data };
        default:
            return state;
    }
}

export enum LoginActionTypes {
    Signin = 'Signin',
}