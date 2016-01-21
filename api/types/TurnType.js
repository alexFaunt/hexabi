import PlayerType from './PlayerType';

import {
	GraphQLInt,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString
} from 'graphql';

export default new GraphQLObjectType({
	name: 'TurnType',
	description: 'Turns taken in a game',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLInt),
			description: 'Id of the Turn'
		},
		type: {
			type: GraphQLInt,
			description: 'The type of Turn'
		},
		card: {
			type: GraphQLString,
			description: 'The card used'
		},
		info: {
			type: GraphQLString,
			description: 'The info given'
		},
		target: {
			type: PlayerType,
			description: 'The player info given to'
		}
	})
});
