import React from 'react';
import { Route } from 'react-router';

import Landing from '../components/Landing/Landing';
import Login from '../components/Login/Login';
import GameList from '../components/GameList/GameList';
import Page from '../components/Page/Page';

export default function (store) {

    function requireAuth (routerState, replaceState) {
        if (!store.getState().Session.isLoaded) { return; }
        if (!store.getState().Session.isLoggedIn) {
            replaceState(null, '/login');
        }
    }

    function requireNoAuth (routerState, replaceState) {
        if (!store.getState().Session.isLoaded) { return; }
        if (store.getState().Session.isLoggedIn) {
            replaceState(null, '/');
        }
    }

    return (
        <Route component={ Page } >
            <Route onEnter={ requireAuth } >
                <Route path="/" component={ Landing } />
                <Route path="games" component={ GameList } />
            </Route>
            <Route onEnter={ requireNoAuth } >
                <Route path="login" component={ Login } />
            </Route>
        </Route>
    );
}
