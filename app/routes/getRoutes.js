import React from 'react';
import { Route } from 'react-router';

import Page from '../containers/Page/Page';
import Landing from '../containers/Landing/Landing';
import Lobby from '../containers/Lobby/Lobby';

import Register from '../components/Register/Register';
import Login from '../components/Login/Login';
import Account from '../components/Account/Account';

export default function (store) {

	function requireAuth (routerState, replaceState) {
		if (!store.getState().Session.isLoaded) {
			return;
		}

		if (!store.getState().Session.isLoggedIn) {
			replaceState(null, '/');
		}
	}

	function requireNoAuth (routerState, replaceState) {
		if (!store.getState().Session.isLoaded) {
			return;
		}

		if (store.getState().Session.isLoggedIn) {
			replaceState(null, '/lobby');
		}
	}

	return (

		<Route component={ Page } >
			<Route onEnter={ requireAuth } >
				<Route path="account" component={ Account } />
				<Route path="lobby" component={ Lobby } />
			</Route>
			<Route onEnter={ requireNoAuth } >
				<Route path="/" component={ Landing } />
				<Route path="login" component={ Login } />
				<Route path="register" component={ Register } />
			</Route>
		</Route>
	);
}
