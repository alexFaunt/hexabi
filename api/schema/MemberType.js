import {
	GraphQLInt,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList
} from 'graphql';

import PlayerType from './PlayerType';
import GameType from './GameType';

export default new GraphQLObjectType({
	name: 'Member',
	description: 'Member type object thing',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLInt),
			description: 'The id of the member.'
		},
		name: {
			type: GraphQLString,
			description: 'The name of the member.'
		},
		avatar: {
			type: GraphQLString,
			description: 'The avatar of the member.'
		},
		players: {
			type: new GraphQLList(PlayerType),
			description: 'players'
		},
		createdGames: {
			type: new GraphQLList(GameType),
			description: 'games created by member'
		},
		playingGames: {
			type: new GraphQLList(GameType),
			description: 'games playing by member'
		}
	})
});
