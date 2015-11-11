import * as Session from '../actions/Session';

const defaultState = {
    token: null,
    member: null,
    isLoggedIn: false
};

export default function sessionReducer (state = defaultState, action) {

    switch (action.type) {
        case Session.LOGIN:
            return {
                token: action.res.data.token,
                member: action.res.data.member,
                isLoggedIn: true
            };

            // TODO - redirect to something else?! I Really don't get this shit.
            // return state;

        case Session.LOGOUT:
            return defaultState;

        default:
            return state;
    }
}
