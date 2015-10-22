import fs from 'fs';

const defs = {
    queries: {},
    mutations: {}
};

import * as User from './User'; append(User);
import * as Game from './Game'; append(Game);

export default defs;

function append (item) {
    for (let prop in item) {
        if (!item.hasOwnProperty(prop)) {
            continue;
        }
        for (let value in item[prop]) {
            if (!item[prop].hasOwnProperty(value)) {
                continue;
            }

            // if it's already there then we have a problem.
            if (defs[prop].hasOwnProperty(value)) {
                throw 'ERROR! two end points with same name. Not allowed';
            }
            defs[prop][value] = item[prop][value];
        }
    }
}
