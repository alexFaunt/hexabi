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
			.fetch({
				withRelated: [
					'players',
					'players.game',
					'players.game.creator',
					'players.game.players',
					'createdGames',
					'playingGames'
				]
			})
			.then((member) => member.toJSON());
	}
};

export const members = {
	type: new GraphQLList(MemberType),
	description: 'get all members',
	resolve: function () {
		return MemberModel
			.fetchAll({
				withRelated: [ 'players', 'players.game', 'createdGames', 'playingGames' ]
			})
			.then((members) => {
				return members.toJSON();
			});
	}
};
