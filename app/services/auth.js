import axios from 'axios';
import Promise from 'promise';

import config from '../../server-config';

const ENDPOINT = 'http://localhost:' + config.port + '/auth/';

function shallowValidate (username, password) {
    if (!username || !password) {
        return false;
    }
    if (username.length < 4 || password.length < 4) {
        return false;
    }
    return true;
}

export function login (data) {
    const { username, password } = data;

    if (!shallowValidate(username, password)) {
        console.log('INVALID')
        return Promise.reject();
    }

    // Return axios to the api end point
    return axios({
        url: ENDPOINT + 'login',
        method: 'post',
        data
    });
}

export function logout (data) {
    // Return axios to the api end point
    return axios({
        url: ENDPOINT + 'logout',
        method: 'post',
        data
    });
}

export function initSession ({ token }) {
    const headers = {};

    if (token) {
        headers.token = token;
    }

    // Return axios to the api end point
    return axios({
        url: ENDPOINT + 'initSession',
        method: 'post',
        headers
    });
}
