import React from 'react';
import { Router } from 'react-router';

import { createHistory } from 'history';

import routes from './routes';

const history = createHistory();

export default (
    <Router history={history}>{routes}</Router>
);
