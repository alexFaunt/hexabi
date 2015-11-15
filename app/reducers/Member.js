import { CREATE_MEMBER, GET_MEMBER, GET_MEMBERS } from '../actions/Member';
import { SUCCESS } from '../constants/Response';

// Need to decide what to do with this store.
const defaultState = [];

export default function memberReducer(state = defaultState, { type, status, data }) {
    // Will deal later.
    if (status !== SUCCESS) {
        return state;
    }

    switch (type) {
        case CREATE_MEMBER:
            return state.concat(data.createMember);

        case GET_MEMBER:
            return data.member;

        case GET_MEMBERS:
            return data.members;

        default:
            return state;
    }
}
