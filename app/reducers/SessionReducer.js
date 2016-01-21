import { INIT_SESSION, LOGIN, LOGOUT, REGISTER } from '../actions/SessionActions';
import { SUCCESS, FAILURE } from '../constants/Response';

const defaultState = {
    token: null,
    member: null,
    isLoggedIn: false,
    isLoaded: false
};

const LOGGED_OUT = Object.assign({}, defaultState, {
    isLoaded: true
});

export default function sessionReducer (state = defaultState, { type, status, data }) {
    // If it's an auth error - log out.
    if (status === FAILURE && data && data.code === 401) {
        return LOGGED_OUT;
    }

    if (status !== SUCCESS) {
        return state;
    }

    switch (type) {
        case REGISTER:
        // TODO - i'm not returning data yet.
            return Object.assign({}, state, data, {
                isLoggedIn: true
            });

        case LOGIN:
            return Object.assign({}, state, data, {
                isLoggedIn: true
            });

        case LOGOUT:
            return LOGGED_OUT;

        case INIT_SESSION:
            return Object.assign({}, data, {
                isLoaded: true
            });

        default:
            return state;
    }
}
