import axios from 'axios';
import Promise from 'promise';

import config from '../../server-config';

export const CREATE_MEMBER = 'CREATE_MEMBER';
export const GET_MEMBER = 'GET_MEMBER';
export const GET_MEMBERS = 'GET_MEMBERS';

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

export function createMember (name, avatar) {

    // Cause it's required need to check it.
    if (!name) {
        return {
            type: CREATE_MEMBER,
            promise: Promise.reject(false)
        }
    }

    let params = 'name: "' + name + '"';

    if (avatar) {
        params += ', avatar: "' + avatar + '"';
    }

    return {
        type: CREATE_MEMBER,
        promise: axios(createRequest('mutation { createMember (' + params + ') {id, name, avatar, score} }'))
    }
};

export function getMember (id) {

    // Cause it's required need to check it.
    if (!id) {
        return {
            type: GET_MEMBER,
            promise: Promise.reject(false)
        }
    }

    return {
        type: GET_MEMBER,
        promise: axios(createRequest('query { member ( id: "' + id + '" ) {id, name, avatar, score} }'))
    }
};

export function getMembers () {
    return {
        type: GET_MEMBERS,
        promise: axios(createRequest('query { members {id, name, avatar, score} }'))
    }
};
