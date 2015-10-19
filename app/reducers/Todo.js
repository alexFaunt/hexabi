import Immutable from 'immutable';

import * as Todo from '../actions/Todo';

const defaultState = new Immutable.List();
 
export default function todoReducer(state = defaultState, action) {

    switch (action.type) {
        case Todo.CREATE_TODO:
            return state.concat(action.text);
        case Todo.EDIT_TODO:
            return state.set(action.id, action.text);
        case Todo.DELETE_TODO:
            return state.delete(action.id);
        default:
            return state;
    }
}
