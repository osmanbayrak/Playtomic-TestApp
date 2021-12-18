import { Dispatch } from 'react';
import { initializeApp } from 'firebase/app';
import { notification } from 'antd';
import { PageEventActionTypes } from '../../Reducers/PageEvents/PageEventsReducer';
import { loginInputDataDto } from '../../DataModels/LoginDataDto';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { LoginActionTypes } from '../../Reducers/Login/LoginReducer';

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
                history.push('/Dashboard');
                localStorage.setItem('user', JSON.stringify(user))
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

