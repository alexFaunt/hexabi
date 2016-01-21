import {
	GraphQLString,
	GraphQLList
} from 'graphql';

import PlayerType from '../types/PlayerType';
import PlayerModel from '../models/PlayerModel';

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
			.fetchAll({ withRelated: [ 'member', 'game' ] })
			.then((players) => players.toJSON());
	}
};

export const myPlayers = {
	type: new GraphQLList(PlayerType),
	description: 'get all players',
	resolve: function () {

		return (new PlayerModel())

			.fetchAll({ withRelated: [ 'game' ] })
			.then(function (players) {
				return players.toJSON();
			});
	}
};
