import axios from 'axios';
import Promise from 'promise';

import config from '../../server-config';

export const CREATE_USER = 'CREATE_USER';
export const GET_USER = 'GET_USER';
export const GET_USERS = 'GET_USERS';

const API = 'http://localhost:' + config.port + '/api'

const request = {
    url: API,
    method: 'post',
    headers: {
        'Content-Type': 'application/graphql'
    }
};

function createRequest (data) {
    const requestData = request;
    requestData.data = data;
    return requestData;
}

export function createUser (name, avatar) {

    // Cause it's required need to check it.
    if (!name) {
        return {
            type: CREATE_USER,
            promise: Promise.reject(false)
        }
    }

    let params = 'name: "' + name + '"';

    if (avatar) {
        params += ', avatar: "' + avatar + '"';
    }

    return {
        type: CREATE_USER,
        promise: axios(createRequest('mutation { createUser (' + params + ') {id, name, avatar, score} }'))
    }
};

export function getUser (id) {

    // Cause it's required need to check it.
    if (!id) {
        return {
            type: GET_USER,
            promise: Promise.reject(false)
        }
    }

    return {
        type: GET_USER,
        promise: axios(createRequest('query { user ( id: "' + id + '" ) {id, name, avatar, score} }'))
    }
};

export function getUsers () {
    return {
        type: GET_USERS,
        promise: axios(createRequest('query { users {id, name, avatar, score} }'))
    }
};
