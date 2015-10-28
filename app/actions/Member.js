import api from '../services/api';

export const CREATE_MEMBER = 'CREATE_MEMBER';
export const GET_MEMBER = 'GET_MEMBER';
export const GET_MEMBERS = 'GET_MEMBERS';

const response = {
    id: true,
    name: true,
    avatar: true,
    score: true
};

export function createMember (params) {

    // Cause it's required need to check it.
    if (!params || !params.name) {
        return {
            type: CREATE_MEMBER,
            promise: Promise.reject(false)
        }
    }

    return {
        type: CREATE_MEMBER,
        promise: api.mutation('createMember', params, response)
    }
};

export function getMember (params) {

    // Cause it's required need to check it.
    if (!params || !params.id) {
        return {
            type: GET_MEMBER,
            promise: Promise.reject(false)
        }
    }

    return {
        type: GET_MEMBER,
        promise: api.query('member', params, response)
    }
};

export function getMembers () {
    return {
        type: GET_MEMBERS,
        promise: api.query('members', null, response)
    }
};
