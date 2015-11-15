export const CREATE_MEMBER = 'CREATE_MEMBER';
export const GET_MEMBER = 'MEMBER';
export const GET_MEMBERS = 'MEMBERS';

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
