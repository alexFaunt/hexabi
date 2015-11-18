const queries = {};

import * as member from './Member'; append(member);
import * as game from './Game'; append(game);
import * as player from './Player'; append(player);
import * as login from './Login'; append(login);

function append (model) {
    for (let endpoint in model) {
        if (!model.hasOwnProperty(endpoint)) {
            continue;
        }

        // if it's already there then we have a problem.
        if (queries.hasOwnProperty(endpoint)) {
            throw 'ERROR! two queries points with same name. Not allowed...' + endpoint;
        }

        queries[endpoint] = model[endpoint];
    }
}

export default queries;
