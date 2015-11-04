// import { API } from '../middleware/api'

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
        query: { params, response }
    }
};

export function getMember (params) {
    return {
        type: GET_MEMBER,
        query: { params, response }
    }
};

export function getMembers () {
    return {
        type: GET_MEMBERS,
        mutation: { response }
    }
};
