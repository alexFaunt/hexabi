// Imports
import express from 'express';
import fs from 'fs';
import path from 'path';
import routes from './app/routes';
import { match, RoutingContext } from 'react-router';
import React from 'react';
import { createLocation } from 'history';

import config from './server-config.js';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import counter from './app/reducers/counter';

// Function defs
function createApp () {
    return express();
}

// Get the HTML file to dump content into
const htmlFile = fs.readFileSync(path.join(__dirname, './app/index.html'), {encoding: 'utf-8'});

// Given the render props - reutrn the page to render.
function getPayload (renderProps) {
    let payload = htmlFile;

    const store = createStore(counter);

    const app = React.renderToString(
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
console.log(req.url);

console.log(createLocation(req.url))

        match({ routes, location: createLocation(req.url)}, (error, redirectLocation, renderProps) => {

            if (error) {
                res.send(500, error.message);
            }
            else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }
            else if (renderProps) {
                res.status(200).send(getPayload(renderProps));
            }
            else {
                res.send(404, 'Not found CHANGED');
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
