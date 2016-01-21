import {
	GraphQLInt,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
	GraphQLBoolean,
	GraphQLList
} from 'graphql';

import MemberType from './MemberType';
import GameType from './GameType';

export default new GraphQLObjectType({
	name: 'Player',
	description: 'Player type object thing',
	fields: () => ({
		id: {
			type: new GraphQLNonNull(GraphQLInt),
			description: 'The id of the player.'
		},
		member: {
			type: MemberType,
			description: 'The member who is this player.'
		},
		game: {
			type: GameType,
			description: 'The game who is this player.'
		},
		position: {
			type: GraphQLInt,
			description: 'The position of this player.'
		},
		hand: {
			type: GraphQLString,
			description: 'The hand of this player.'
		},
		focus: {
			type: GraphQLBoolean,
			description: 'The focus of this player.'
		},
		finished: {
			type: GraphQLBoolean,
			description: 'The finished of this player.'
		}
	})
});
