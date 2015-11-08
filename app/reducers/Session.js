import * as Session from '../actions/Session';

const defaultState = {
    token: null,
    member: null
};

export default function sessionReducer (state = defaultState, action) {

    switch (action.type) {
        case Session.LOGIN:
            state.token = action.res.data.token;
            state.member = action.res.data.member;

            // TODO - redirect to something else?! I Really don't get this shit.
            return state;

        case Session.LOGOUT:
            state = defaultState;

            return state;

        default:
            return state;
    }
}
