import * as auth from '../services/auth';

export const LOGIN = 'login';
export const LOGOUT = 'logout';

export function login (username, password) {
    return {
        type: LOGIN,
        auth: { username, password }
    };
};

export function logout (username) {
    return {
        type: LOGOUT,
        auth: { username }
    };
};
