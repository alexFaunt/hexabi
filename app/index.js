import React from 'react';
import ReactDOM from 'react-dom';
import router from './router';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counter from './reducers/counter';

if (typeof document === 'undefined') {
    throw 'no document, wtf';
};

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__;

// Create Redux store with initial state
const store = createStore(counter, initialState);


ReactDOM.render(<Provider store={store}>{router}</Provider>, document.getElementById('content'));
