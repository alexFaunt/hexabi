// Imports
import express from 'express';
import fs from 'fs';
import path from 'path';
import routes from './app/routes';
import { match, RoutingContext } from 'react-router';
import React from 'react';

// Function defs
function createApp() {return express();}

function run() {

    // Create app
    const app = createApp();

    // Get the HTML file to dump content into
    const htmlFile = fs.readFileSync(path.join(__dirname, './app/index.html'), {encoding: 'utf-8'});

    // Static
    app.use('/static', express.static(path.join(__dirname, './static')));
    app.use('/build', express.static(path.join(__dirname, './build')));

    // Routing
    app.get('*', (req, res) => {

        console.log('request made to: ' + req.url);

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
                res.send(404, 'Not found');
            }
        });

    });

    // Listen
    app.listen(8080);
    console.log('SERVER IS LISTENING O_O');
}
console.log('IM HERE OR SOMETHING');
// Run
if (require.main === module) {
    run();
}
