import PlayerType from './PlayerType';
import MemberType from './MemberType';
import TurnType from './TurnType';

import {
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString
} from 'graphql';

export default new GraphQLObjectType({
	name: 'Game',
	description: 'Game type object thing',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLInt),
			description: 'The id of the game.'
		},
		creator: {
			type: MemberType,
			description: 'The creator of the game.'
		},
		score: {
			type: GraphQLInt,
			description: 'The score of the game.'
		},
		status: {
			type: GraphQLInt,
			description: 'The status of the game.'
		},
		players: {
			type: new GraphQLList(PlayerType),
			description: 'Players in this game'
		},
		turns: {
			type: new GraphQLList(TurnType),
			description: 'Turns in this game'
		},
		lives: {
			type: GraphQLInt,
			description: 'The lives of the game'
		},
		infos: {
			type: GraphQLInt,
			description: 'The infos of the game'
		},
		deck: {
			type: GraphQLString,
			description: 'The deck of the game'
		},
		played: {
			type: GraphQLString,
			description: 'The played of the game'
		},
		discard: {
			type: GraphQLString,
			description: 'The discard of the game'
		},
		name: {
			type: GraphQLString,
			description: 'The name of the game'
		},
		secret: {
			type: GraphQLString,
			description: 'The secret passcode of the game'
		}
	}
});
