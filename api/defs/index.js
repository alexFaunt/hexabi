import fs from 'fs';

const queries = {};
const mutations = {};

function append (item) {
    for (let prop in item.queries) {
        if (!item.queries.hasOwnProperty(prop)) {
            continue;
        }

        if (queries.hasOwnProperty(prop)) {
            throw 'ERROR! two end points with same name. Not allowed';
        }

        queries[prop] = item.queries[prop];
    }
}

import * as User from './User';
append(User);

import * as Game from './Game';
append(Game);

export { queries, mutations };
