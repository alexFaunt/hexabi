import config from '../../server/config/server-config';

import {
	GraphQLString
} from 'graphql';

import LoginType from '../types/LoginType';
import LoginModel from '../models/LoginModel';

export const login = {
	type: LoginType,
	description: 'get secret and member by username',
	args: {
		username: {
			type: GraphQLString,
			name: 'username'
		},
		secret: {
			type: GraphQLString,
			name: 'secret'
		}
	},
	resolve: function (_, { secret, username }) {

		// TODO - Need to block this from being accessed some how...
		// Even if you have a token you aren't allowed to poll this lol...
		// TODO - how do i keep my secret safe on the server side?
		if (secret !== config.auth.secret) {
			// The fuck you doing to me
			// Pretty sure this is bullshit.
			return Promise.reject();
		}

		return LoginModel
			.where({ username })
			.fetch({ withRelated: [ 'member' ] })
			.then(function (login) {
				return login && login.toJSON();
			});
	}
};
