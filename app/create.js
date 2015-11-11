import { createStore as _createStore, applyMiddleware, compose, combineReducers } from 'redux';
import api from './middleware/api';
import auth from './middleware/auth';
import error from './middleware/error';
import * as reducers from './reducers';

export default function createStore(reduxReactRouter, getRoutes, createHistory, data) {
    const middleware = [api, auth];

    let finalCreateStore = applyMiddleware(...middleware)(_createStore);

    finalCreateStore = reduxReactRouter({ getRoutes, createHistory })(finalCreateStore);

    const reducer = combineReducers(reducers);

    const store = finalCreateStore(reducer, data);

    return store;
}
