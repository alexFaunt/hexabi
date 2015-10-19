import React from 'react';
import ReactDOM from 'react-dom';
import router from './router';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './reducers';

import promiseMiddleware   from './core/lib/promiseMiddleware';

import { fromJS } from 'immutable';

if (typeof document === 'undefined') {
    throw 'no document, wtf';
};

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;

// Transform into Immutable.js collections,
// but leave top level keys untouched for Redux
Object
    .keys(initialState)
    .forEach(key => {
        initialState[key] = fromJS(initialState[key]);
    });

const reducer = combineReducers(reducers);
const store = applyMiddleware(promiseMiddleware)(createStore)(reducer, initialState);

ReactDOM.render(<Provider store={store}>{router}</Provider>, document.getElementById('content'));
