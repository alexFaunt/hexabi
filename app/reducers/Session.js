import * as Session from '../actions/Session';

const defaultState = {
    token: null,
    member: null,
    isLoggedIn: false,
    isLoaded: false
};

export default function sessionReducer (state = defaultState, action) {

    switch (action.type) {
        case Session.LOGIN:
            return {
                token: action.res.data.token,
                member: action.res.data.member,
                isLoggedIn: true,
                isLoaded: true
            };

            // TODO - redirect to something else?! I Really don't get this shit.
            // return state;

        case Session.LOGOUT:
            return {
                token: defaultState.token,
                member: defaultState.member,
                isLoggedIn: defaultState.isLoggedIn,
                isLoaded: true
            };

        case Session.INIT_SESSION:
        console.log('INIT SESSION COMPLETE', action.res.data);
            return {
                token: action.res.data.token,
                member: action.res.data.member,
                isLoggedIn: action.res.data.isLoggedIn,
                isLoaded: true
            };

        default:
            return state;
    }
}
