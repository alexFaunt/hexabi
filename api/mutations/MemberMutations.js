import {
	GraphQLString,
	GraphQLNonNull
} from 'graphql';

import MemberType from '../types/MemberType';
import MemberModel from '../models/MemberModel';

const DEFAULT_SCORE = 0;

export const createMember = {
	type: MemberType,
	args: {
		name: {
			name: 'name',
			type: new GraphQLNonNull(GraphQLString)
		},
		avatar: {
			name: 'avatar',
			type: GraphQLString
		}
	},
	resolve: function (_, { name, avatar }) {
		return (new MemberModel())
			.save({ name, avatar })
			.then(function (model) {
				return {
					id: model.id, name, avatar, score: DEFAULT_SCORE
				};
			}, function () {
				console.error(arguments);
			});
	}
};
