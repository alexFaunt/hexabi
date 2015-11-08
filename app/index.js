import React from 'react';
import ReactDOM from 'react-dom';
import router from './router';

import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import storeFactory from './factories/store';

if (typeof document === 'undefined') {
    throw 'no document, wtf';
};

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;

const reducer = combineReducers(reducers);
const store = storeFactory(reducer, initialState);

store.history = router.props.history;

ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
document.getElementById('content'));
