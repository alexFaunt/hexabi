const queries = {};

import * as Member from './Member'; append(Member);
import * as Game from './Game'; append(Game);
import * as Player from './Player'; append(Player);
import * as Login from './Login'; append(Login);

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
