export const INIT_SESSION = 'INIT_SESSION';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

export function register (username, password, member) {
    return {
        type: REGISTER,
        auth: { username, password, member }
    };
};

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

export function initSession () {
    return {
        type: INIT_SESSION,
        auth: { }
    };
};
