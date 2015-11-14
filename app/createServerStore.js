import { createStore as _createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { server as middleware } from './middleware';
import * as reducers from './reducers';
import getRoutes from './getServerRoutes';
import createHistory from 'history/lib/createMemoryHistory';
import { reduxReactRouter } from 'redux-router/server';

export default function createServerStore() {
    let finalCreateStore = applyMiddleware(...middleware)(_createStore);

    finalCreateStore = reduxReactRouter({ getRoutes, createHistory })(finalCreateStore);

    const reducer = combineReducers(reducers);

    return finalCreateStore(reducer);
}
