import React from 'react';
import ReactDOM from 'react-dom';

import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './reducers';
import makeRouteHooksSafe from './utils/makeRouteHooksSafe';
import { ReduxRouter } from 'redux-router';
import createClientStore from './createClientStore';
import getClientRoutes from './getClientRoutes';

// Grab the state from a global injected into server-generated HTML
const store = createClientStore(makeRouteHooksSafe(getClientRoutes));

const component = (
    <ReduxRouter routes={getClientRoutes(store)} />
);

ReactDOM.render(
    <Provider store={store} key="provider">
        {component}
    </Provider>,
    document.getElementById('content')
);
