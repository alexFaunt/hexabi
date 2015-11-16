import fs from 'fs';
import path from 'path';
// We still need this even though not accesing directly for the jsx.
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match } from 'redux-router/server';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import createServerStore from '../../app/stores/createServerStore';

const htmlFile = fs.readFileSync(path.join(__dirname, '../../app/index.html'), { encoding: 'utf-8' });

export default function ({ token, originalUrl }, res) {
    const isLogin = originalUrl.match('login')

    if (token && isLogin) {
        return res.redirect(302, '/');
    }

    if (!token && !isLogin) {
        return res.redirect(302, '/login');
    }

    const store = createServerStore();

    // This is hack number 1
    // The server doesn't forward the cookie, so we have to set it
    // in the store, so it can be passed into the api calls.
    // I cannot workout a workaround for this.
    store.getState().Session.token = token;

    store.dispatch(match(originalUrl, function (error, redirectLocation, routerState) {
        if (redirectLocation) {
            return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        }

        if (error) {
            return res.status(500).send();
        }

        // Could take this to mean 404...
        if (!routerState) {
            return res.status(404).send();
        }

        // Workaround redux-router query string issue:
        // https://github.com/rackt/redux-router/issues/106
        if (routerState.location.search && !routerState.location.query) {
            routerState.location.query = qs.parse(routerState.location.search);
        }

        store.getState().router.then(function () {
            const content = ReactDOMServer.renderToString(
                <Provider store={store} key="provider">
                    <ReduxRouter/>
                </Provider>
            );

            let payload = htmlFile;

            // Put in the content
            payload = payload.replace(/__content__/,  content);

            // Put in the initial state
            payload = payload.replace(/__state__/, JSON.stringify(store.getState()));

            res.status(200).send(payload);
        });

    }));
}
