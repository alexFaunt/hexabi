import api from '../services/api';

export const CREATE_MEMBER = 'createMember';
export const GET_MEMBER = 'member';
export const GET_MEMBERS = 'members';

const response = {
    id: true,
    name: true,
    avatar: true,
    score: true
};

export function createMember (params) {
    return {
        type: CREATE_MEMBER,
        promise: api.mutation(CREATE_MEMBER, params, response)
    }
};

export function getMember (params) {
    return {
        type: GET_MEMBER,
        promise: api.query(GET_MEMBER, params, response)
    }
};

export function getMembers () {
    return {
        type: GET_MEMBERS,
        promise: api.query(GET_MEMBERS, null, response)
    }
};
