import {
	GraphQLString,
	GraphQLList
} from 'graphql';

import MemberType from '../schema/MemberType';
import MemberModel from '../models/Member';

export const member = {
	type: MemberType,
	description: 'Return member by id',
	args: {
		id: {
			type: GraphQLString,
			name: 'id'
		}
	},
	resolve: function (_, { id }) {
		return MemberModel
			.where('id', id)
			.fetch()
			.then((member) => member.toJSON());
	}
};

export const members = {
	type: new GraphQLList(MemberType),
	description: 'get all members',
	resolve: function () {
		return MemberModel
			.fetchAll()
			.then((members) => members.toJSON());
	}
};
