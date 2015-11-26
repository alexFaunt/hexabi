import React from 'react';

import { Route } from 'react-router';

import getRoutes from './getRoutes';

import Server from '../containers/App/Server';

export default function (store) {
    return (
        <Route component={ Server }>
            { getRoutes(store) }
        </Route>
    );
};
