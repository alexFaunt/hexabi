import React from 'react';
import { Route } from 'react-router';

import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Menu from './components/Menu/Menu';
import GameList from './components/GameList/GameList';
import Page from './components/Page/Page';
import Register from './components/Register/Register';


export default (
    <Route component={Page}>
        <Route path="/" component={Landing} />
        <Route path="join-us" component={Register} />
        <Route path="menu" component={Menu} />
        <Route path="games" component={GameList} />
        <Route path="login" component={Login} />
    </Route>
);
