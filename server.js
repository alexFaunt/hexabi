// set up config
import config from './server-config.js';

// Standard imports
import express from 'express';
import fs from 'fs';
import path from 'path';
import favicon from 'serve-favicon';

// Routes
import { RoutingContext } from 'react-router';

// Rendering
import React from 'react';
import ReactDOMServer from 'react-dom/server';

// Flux stuff
import { combineReducers, applyMiddleware } from 'redux';
import * as reducers from './app/reducers';

// Api
import { graphql } from 'graphql';
import bodyParser from 'body-parser';
import schema from './api/schema';

// Auth
import cookieParser from 'cookie-parser';
import jwtToken from 'jsonwebtoken';

import { match } from 'redux-router/server';
import { Provider } from 'react-redux';
import { ReduxRouter } from 'redux-router';
import createServerStore from './app/createServerStore';

// Get the HTML file to dump content into
const htmlFile = fs.readFileSync(path.join(__dirname, './app/index.html'), {encoding: 'utf-8'});

// Function defs
function createApp () {
    return express();
}

function getTokenFromRequest (req) {
    if (req.cookies.token) {
        return req.cookies.token;
    }
    if (req.headers.token) {
        return req.headers.token;
    }
    return null;
}

// start the app
function run () {

    // Create app
    const app = createApp();

    // Static assets
    app.use(favicon(path.join(__dirname, './static', 'favicon.ico')));
    app.use('/static', express.static(path.join(__dirname, './static')));
    app.use('/build', express.static(path.join(__dirname, './build')));
    function fromHeaderOrQuerystring (req) {
        return null;
    };
    // parse POST body as text
    app.post(
        '/api',
        cookieParser(),
        bodyParser.text({ type: 'application/graphql' }),
        function (req, res, next) {
            const token = getTokenFromRequest(req);
            if (token === null) {
                return res.redirect(302, '/login');
            }
            // TODO - TEST UNVERIFIED TOKEN
            const decoded = jwtToken.verify(token, config.auth.secret);
            // TODO - check it?
            req.member = decoded;
            return next();
        },
        function (req, res) {
            // TODO - validate req.member token

            // execute GraphQL!
            graphql(schema, req.body)
                .then(function (result) {
                    res.status(200).send(JSON.stringify(result.data, null, 2));
                })
                .catch(function (err) {
                    console.error(err);
                    res.status(500).send(err.message);
                });
        });

    // Auth
    function generateToken(username, password) {
        const payload = { username, password };
        return jwtToken.sign(payload, config.auth.secret);
        // , {
        //     expiresInMinutes: config.auth.expires // TODO - this
        // }
    }

    // TODO - LOGOUT
    app.use('/auth/login', bodyParser.json());
    app.post('/auth/login', function (req, res) {

        // TODO check if it's a good login
        if (req.body.username !== "alex" || req.body.password !== "pass") {
            console.log('NO AUTHED', req.body.username, req.body.password);
            return res.status(200).send(JSON.stringify({result: 'failure'}));
        }

        // make a token
        const token = generateToken(req.body.username, req.body.password);

        const id = '1';

        // Get a graphql
        graphql(schema, 'query { member (id: "' + id + '") { id, name } }')
            .then(function (response) {
                // Check against DB
                res.status(200)
                    .cookie('token', token)
                    .send(JSON.stringify({
                        result: 'success',
                        member: response.data.member,
                        token
                    }, null, 2));
            })
            .catch(function (err) {
                res.status(500).send(err.message);
            });

    });

    app.post('/auth/initSession', cookieParser(), function (req, res) {
        const token = getTokenFromRequest(req);

        // TODO - validate token
        // const decoded = jwtToken.verify(token, config.auth.secret);
        if (!token) {
            res.status(200).send(JSON.stringify({
                token: null,
                member: null,
                isLoggedIn: false
            }))
        }

        // TODO - pick member from decoded token
        const id = '1';

        // Get a graphql
        graphql(schema, 'query { member (id: "' + id + '") { id, name } }')
            .then(function (response) {
                // Check against DB
                res.status(200)
                    .send(JSON.stringify({
                        isLoggedIn: true,
                        member: response.data.member,
                        token
                    }, null, 2));
            })
            .catch(function (err) {
                res.status(500).send(err.message);
            });

    });

    app.use('*', cookieParser(), function (req, res) {

        const token = getTokenFromRequest(req);
        const isLogin = req.originalUrl.match('login')

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
        store.getState().Session.token = req.cookies.token;

        store.dispatch(match(req.originalUrl, function (error, redirectLocation, routerState) {
            if (redirectLocation) {
                return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            }

            if (error) {
                return res.status(500).send();
            }

            if (!routerState) {
                return res.status(500).send();
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
    });

    // Listen
    app.listen(config.port);
    console.log('SERVER IS LISTENING O_O');
}

// Run
if (require.main === module) {
    run();
}
