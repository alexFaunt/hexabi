import React from 'react';
import { Router } from 'react-router';

import createBrowserHistory from 'history/lib/createBrowserHistory';

import routes from './routes';

const history = createBrowserHistory();

export default (
    <Router history={history}>{routes}</Router>
);
