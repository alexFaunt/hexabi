const mutations = {};

import * as member from './Member'; append(member);
import * as game from './Game'; append(game);
import * as player from './Player'; append(player);
import * as login from './Login'; append(login);
import * as provider from './Provider'; append(provider);

function append (model) {
    for (let endpoint in model) {
        if (!model.hasOwnProperty(endpoint)) {
            continue;
        }

        // if it's already there then we have a problem.
        if (mutations.hasOwnProperty(endpoint)) {
            throw 'ERROR! two mutations points with same name. Not allowed...' + endpoint;
        }

        mutations[endpoint] = model[endpoint];
    }
}

export default mutations;
