import {
	GraphQLInt,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString
} from 'graphql';

export default new GraphQLObjectType({
	name: 'Member',
	description: 'Member type object thing',
	fields: {
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
		}
		// ,
		// score: { TODO - derive this form other data
		// 	type: GraphQLInt,
		// 	description: 'The score of the member.'
		// }
	}
});
