import React from 'react';
import ReactDOM from 'react-dom';

import createHistory from 'history/lib/createBrowserHistory';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import storeFactory from './factories/store';
import makeRouteHooksSafe from './core/lib/makeRouteHooksSafe';
import { reduxReactRouter, ReduxRouter } from 'redux-router';
import createStore from './create';
import getRoutes from './routes';

if (typeof document === 'undefined') {
    throw 'no document, wtf';
};

// Grab the state from a global injected into server-generated HTML
const store = createStore(reduxReactRouter, makeRouteHooksSafe(getRoutes), createHistory, window.__INITIAL_STATE__);

const component = (
    <ReduxRouter routes={getRoutes(store)} />
);

ReactDOM.render(
    <Provider store={store} key="provider">
        {component}
    </Provider>,
    document.getElementById('content')
);
