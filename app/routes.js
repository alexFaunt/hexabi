import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App';
import Login from './components/Login/Login';
import Menu from './components/Menu/Menu';
import Todo from './components/Todo/Todo';

import auth from './core/auth';
const requireAuth = function (nextState, replaceState) {
    // if (!auth.loggedIn()) {
    //     replaceState({
    //         nextPathname: nextState.location.pathname
    //     }, '/login')
    // }
};

export default (
    <Route>
        <Route path="/" component={App} />
        <Route path="menu" component={Menu} onEnter={requireAuth} />
        <Route path="login" component={Login} />
        <Route path="todo" component={Todo} />
    </Route>
);
