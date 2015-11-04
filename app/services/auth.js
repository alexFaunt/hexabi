import axios from 'axios';
import Promise from 'promise';

import config from '../../server-config';

function shallowValidate (username, password) {
    if (!username || !password) {
        return false;
    }
    if (username.length < 4 || password.length < 4) {
        return false;
    }
    return true;
}

export function login (username, password) {

    if (!shallowValidate(username, password)) {
        console.log('INVALID')
        return Promise.reject();
    }

    // Return axios to the api end point
    return axios({
        url: 'http://localhost:' + config.port + '/auth/login',
        method: 'post',
        data: { username, password }
    });
}

export function isLoggedIn () {
    return true;
}
