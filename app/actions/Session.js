import * as auth from '../services/auth';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export function login (username, password) {
    return {
        type: LOGIN,
        promise: auth.login(username, password)
    };
};

export function logout () {
    return {
        type: LOGOUT,
        promise: auth.logout()
    };
};
