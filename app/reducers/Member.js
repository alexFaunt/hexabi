import Immutable from 'immutable';

import * as Member from '../actions/Member';

const defaultState = new Immutable.List();

export default function memberReducer(state = defaultState, action) {

    switch (action.type) {
        case Member.CREATE_MEMBER:
            return state.concat(action.res.data.createMember);
        case Member.GET_MEMBER:
            return action.res.data.member;
        case Member.GET_MEMBERS:
            return action.res.data.members;
        default:
            return state;
    }
}
