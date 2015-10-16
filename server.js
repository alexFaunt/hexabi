// Imports
import express from 'express';
import fs from 'fs';
import path from 'path';
import routes from './app/routes';
import { match, RoutingContext } from 'react-router';
import React from 'react';

import config from './server-config.js';

// Function defs
function createApp () {
    return express();
}

function run () {

    // Create app
    const app = createApp();

    // Get the HTML file to dump content into
    const htmlFile = fs.readFileSync(path.join(__dirname, './app/index.html'), {encoding: 'utf-8'});

    // Static assets
    app.use('/static', express.static(path.join(__dirname, './static')));
    app.use('/build', express.static(path.join(__dirname, './build')));

    // Everything else - check against the react router + return it server rendered.
    app.get('*', (req, res) => {

        match({ routes, location: req.url}, (error, redirectLocation, renderProps) => {

            if (error) {
                res.send(500, error.message);
            }
            else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }
            else if (renderProps) {
                res.status(200).send(htmlFile.replace(/__content__/,  React.renderToString(<RoutingContext {...renderProps} />)));
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
