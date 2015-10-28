import api from '../services/api';

export const CREATE_GAME = 'CREATE_GAME';
export const GET_GAME = 'GET_GAME';
export const GET_GAMES = 'GET_GAMES';

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
