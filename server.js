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

// Function defs
function createApp () {
    return express();
}

// Get the HTML file to dump content into
const htmlFile = fs.readFileSync(path.join(__dirname, './app/index.html'), {encoding: 'utf-8'});

// Given the render props - reutrn the page to render.
function getPayload (renderProps, store) {
    let payload = htmlFile;

    const app = ReactDOMServer.renderToString(
        <Provider store={store}>
            <RoutingContext {...renderProps} />
        </Provider>
    );

    payload = payload.replace(/__content__/,  app);


    payload = payload.replace(/__state__/, JSON.stringify(store.getState()));

    return payload;
}

function run () {

    // Create app
    const app = createApp();


    // Static assets
    app.use('/static', express.static(path.join(__dirname, './static')));
    app.use('/build', express.static(path.join(__dirname, './build')));

    // Everything else - check against the react router + return it server rendered.
    app.get('*', (req, res) => {

        const location = createLocation(req.url);
        const reducer = combineReducers(reducers);
        const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);

        match({ routes, location }, (error, redirectLocation, renderProps) => {

            if (error) {
                res.status(500).send(error.message);
            }
            else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }
            else if (renderProps) {
                res.status(200).send(getPayload(renderProps, store));
            }
            else {
                res.status(404).send('Not found');
            }
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
