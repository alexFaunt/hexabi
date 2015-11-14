import React from 'react';

import { Route } from 'react-router';

import getRoutes from './getRoutes';

import Client from './components/Client';

export default function (store) {
    return (
        <Route component={Client}>
            { getRoutes(store) }
        </Route>
    );
};
