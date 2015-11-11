import React from 'react';
import { Route } from 'react-router';

import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Menu from './components/Menu/Menu';
import GameList from './components/GameList/GameList';
import Page from './components/Page/Page';
import Register from './components/Register/Register';

export default (store) => {

    const session = store.getState().Session;

    // onEnter requireAuth
    function requireAuth (nextState, replaceState) {
        if (!session.isLoaded()) { return; };
        if (!store.getState().Session.isLoggedIn) {
            replaceState(null, '/login');
        }
    };

    function requireNoAuth (nextState, replaceState) {
        if (!session.isLoaded()) { return; };
        if (store.getState().Session.isLoggedIn) {
            replaceState(null, '/');
        }
    };

    return (
        <Route component={Page}>
            <Route onEnter={requireAuth}>
                <Route path="/" component={Landing} />
                <Route path="join-us" component={Register} />
                <Route path="menu" component={Menu} />
                <Route path="games" component={GameList} />
            </Route>
            <Route onEnter={requireNoAuth}>
                <Route path="login" component={Login} />
            </Route>
        </Route>
    );
};
