import {
	GraphQLString,
	GraphQLList
} from 'graphql';

import PlayerType from '../schema/PlayerType';
import PlayerModel from '../models/Player';

export const player = {
	type: PlayerType,
	description: 'get player by id',
	args: {
		id: {
			type: GraphQLString,
			name: 'id'
		}
	},
	resolve: function (_, { id }) {
		return PlayerModel
			.where('id', id)
			.fetch()
			.then((player) => player.toJSON());
	}
};

export const players = {
	type: new GraphQLList(PlayerType),
	description: 'get all players',
	resolve: function () {
		return PlayerModel
			.fetchAll({ withRelated: [ 'member' ] })
			.then((players) => players.toJSON());
	}
};
