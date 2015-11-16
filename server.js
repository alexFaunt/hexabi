// set up config
import config from './server/config/server-config.js';

// Standard imports
import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';

// Middleware
import bodyParser from 'body-parser';
import tokenParser from './server/middleware/tokenParser';
import jwtToken from 'jsonwebtoken';

// endpoints
import api from './server/endpoints/api';
import login from './server/endpoints/login';
import initSession from './server/endpoints/initSession';
import routes from './server/endpoints/routes';

// start the app
function run () {
    // Create app
    const app = express();

    // Static assets
    app.use(favicon(path.join(__dirname, './static', 'favicon.ico')));
    app.use('/static', express.static(path.join(__dirname, './static')));
    app.use('/build', express.static(path.join(__dirname, './build')));

    // Graph QL end point works as our api
    app.post('/api', bodyParser.text({ type: 'application/graphql' }), tokenParser(), api);

    // TODO - LOGOUT
    app.post('/auth/login',  bodyParser.json(), login);
    app.post('/auth/initSession', tokenParser(), initSession);

    // All other routes hit this and return the app.
    // TODO - 404
    app.use('*', tokenParser(), routes);

    // Listen
    app.listen(config.port);
    console.log('SERVER IS LISTENING O_O');
}

// Run
if (require.main === module) {
    run();
}
