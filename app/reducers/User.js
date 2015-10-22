import Immutable from 'immutable';

import * as User from '../actions/User';

const defaultState = new Immutable.List();

export default function userReducer(state = defaultState, action) {

    switch (action.type) {
        case User.CREATE_USER:
            return state.concat(action.res.data.data.createUser);
        case User.GET_CURRENT_USER:
            return action.res.data.data.currentUser;
        case User.GET_USERS:
            return action.res.data.data.users;
        default:
            return state;
    }
}
