import { Dispatch } from 'react';
import { initializeApp } from 'firebase/app';
import { notification } from 'antd';
import { PageEventActionTypes } from '../../Reducers/PageEvents/PageEventsReducer';
import { loginInputDataDto } from '../../DataModels/LoginDataDto';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { LoginActionTypes } from '../../Reducers/Login/LoginReducer';
import { firebaseConfig } from '../../FirebaseConfig';

initializeApp(firebaseConfig);
const auth = getAuth();

export const Login = (loginData: loginInputDataDto, history: any) => {
    return async (dispatch: Dispatch<any>): Promise<any> => {
        (signInWithEmailAndPassword(auth, loginData.email, loginData.password))
            .then((userCredential: any) => {
                const user = userCredential.user;
                dispatch({
                    type: LoginActionTypes.Signin,
                    data: user,
                });
                // After user login success. Redirect to dashboard page and set the userInfo in localstorage
                localStorage.setItem('user', JSON.stringify(user));
                history.push('/Dashboard');
                // ...
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
            });
    };
};

export interface LoginActionsDeclerations {
    Login(loginData: loginInputDataDto, history: any): Promise<any>;
}

