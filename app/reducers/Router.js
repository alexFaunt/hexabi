import * as Router from '../actions/Router';

const defaultState = {};

export default function routerReducer (state = defaultState, action) {
    switch (action.type) {
        case Router.NAVIGATE:
console.log('NAVIGATE SOME FUCKING HOW ><', action.route)
            return state;

        default:
            return state;
    }
}
