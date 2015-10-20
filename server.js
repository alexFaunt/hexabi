// Imports
import express from 'express';
import fs from 'fs';
import path from 'path';
import routes from './app/routes';
import { match, RoutingContext } from 'react-router';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import { createLocation } from 'history';

import config from './server-config.js';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './app/reducers';
import promiseMiddleware   from 'app/core/lib/promiseMiddleware';
import fetchComponentData from 'app/core/lib/fetchComponentData';

// Function defs
function createApp () {
    return express();
}

// Get the HTML file to dump content into
const htmlFile = fs.readFileSync(path.join(__dirname, './app/index.html'), {encoding: 'utf-8'});

function run () {

    // Create app
    const app = createApp();


    // Static assets
    app.use('/static', express.static(path.join(__dirname, './static')));
    app.use('/build', express.static(path.join(__dirname, './build')));

    // Everything else - check against the react router + return it server rendered.
    app.get('*', (req, res) => {

        const location = createLocation(req.url);

        match({ routes, location }, (error, redirectLocation, renderProps) => {

            if (error) {
                console.log(error);
                return res.status(500).send(error.message);
            }

            if (redirectLocation) {
                return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }

            if (!renderProps) {
                return res.status(404).send('Not found');
            }

            const reducer = combineReducers(reducers);

            const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);

            // Closure gives it store + renderProps
            function getPayload () {
                let payload = htmlFile;

                const app = ReactDOMServer.renderToString(
                    <Provider store={store}>
                        <RoutingContext {...renderProps} />
                    </Provider>
                );

                // Put in the content
                payload = payload.replace(/__content__/,  app);

                // Put in the initial state
                payload = payload.replace(/__state__/, JSON.stringify(store.getState()));

                return payload;
            }

            fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
                .then(getPayload)
                .then(html => res.status(200).end(html))
                .catch(err => res.status(500).end(err.message));
        });

    });

    // Listen
    app.listen(config.port);
    console.log('SERVER IS LISTENING O_O');
}

// Run
if (require.main === module) {
    run();
}
