import {
	GraphQLString,
	GraphQLID
} from 'graphql';

import PlayerType from '../types/PlayerType';
import PlayerModel from '../models/PlayerModel';

export const createPlayer = {
	type: PlayerType,
	args: {
		member: {
			name: 'member',
			type: GraphQLID
		},
		hand: {
			name: 'hand',
			type: GraphQLString
		}
	},
	resolve: function (obj, { member, hand }) {
		return (new PlayerModel())
			.save({ member, hand })
			.then(function (model) {
				return {
					id: model.id, member, hand
				};
			}, function () {
				console.error(arguments);
			});
	}
};
