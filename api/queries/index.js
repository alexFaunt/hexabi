const queries = {};

import * as MemberQueries from './MemberQueries'; append(MemberQueries);
import * as GameQueries from './GameQueries'; append(GameQueries);
import * as PlayerQueries from './PlayerQueries'; append(PlayerQueries);
import * as LoginQueries from './LoginQueries'; append(LoginQueries);

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
