import React from 'react';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

import App from './components/App';

const history = createHistory();

if (typeof document !== 'undefined') {

    React.render((
        <Router history={history}>
            <Route path="/" component={App} />
        </Router>
    ), document.getElementById('content'));
}
