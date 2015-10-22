// set up config
import config from './server-config.js';

// Standard imports
import express from 'express';
import fs from 'fs';
import path from 'path';

// Routes
import routes from './app/routes';
import { match, RoutingContext } from 'react-router';
import { createLocation } from 'history';

// Rendering
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// Flux stuff
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from './app/reducers';
import promiseMiddleware   from 'app/core/lib/promiseMiddleware';
import fetchComponentData from 'app/core/lib/fetchComponentData';

// Api
import { graphql } from 'graphql';
import bodyParser from 'body-parser';
import schema from './api/schema';

// import * as User from './api/defs/User';

// Get the HTML file to dump content into
const htmlFile = fs.readFileSync(path.join(__dirname, './app/index.html'), {encoding: 'utf-8'});

// Function defs
function createApp () {
    return express();
}

// start the app
function run () {

    // Create app
    const app = createApp();

    // Static assets
    app.use('/static', express.static(path.join(__dirname, './static')));
    app.use('/build', express.static(path.join(__dirname, './build')));

    // parse POST body as text
    app.use(bodyParser.text({ type: 'application/graphql' }));

    // Api
    app.post('/api', (req, res) => {

        console.log(req.body);

        // execute GraphQL!
        graphql(schema, req.body)
            .then((result) => {
                res.status(200).send(JSON.stringify(result.data, null, 2));
            })
            .catch((err) => {
                res.status(500).send(err.message);
            });
    });

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
