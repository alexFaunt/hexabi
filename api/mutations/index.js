const mutations = {};

import * as MemberMutations from './MemberMutations'; append(MemberMutations);
import * as GameMutations from './GameMutations'; append(GameMutations);
import * as PlayerMutations from './PlayerMutations'; append(PlayerMutations);
import * as LoginMutations from './LoginMutations'; append(LoginMutations);

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
