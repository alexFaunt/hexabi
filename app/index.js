import React from 'react';
import ReactDOM from 'react-dom';
import router from './router';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './reducers';

import api from './middleware/api';

if (typeof document === 'undefined') {
    throw 'no document, wtf';
};

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;

const reducer = combineReducers(reducers);
const store = applyMiddleware(api)(createStore)(reducer, initialState);

ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
document.getElementById('content'));
