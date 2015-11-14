import { createStore as _createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { client as middleware } from './middleware';
import * as reducers from './reducers';
import createHistory from 'history/lib/createBrowserHistory';
import { reduxReactRouter } from 'redux-router';

export default function createClientStore(getRoutes) {
    let finalCreateStore = applyMiddleware(...middleware)(_createStore);

    finalCreateStore = reduxReactRouter({ getRoutes, createHistory })(finalCreateStore);

    const reducer = combineReducers(reducers);

    return finalCreateStore(reducer, window.__INITIAL_STATE__);
}
