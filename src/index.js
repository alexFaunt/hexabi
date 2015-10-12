import React from 'react';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

import App from './components/App';
import Menu from './components/Menu/Menu';

const history = createHistory();

if (typeof document !== 'undefined') {

    React.render((
        <Router history={history}>
            <Route path="/" component={App} />
            <Route path="menu" component={Menu} />
        </Router>
    ), document.getElementById('content'));
}
