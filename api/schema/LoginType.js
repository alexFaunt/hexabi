import {
	GraphQLInt,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString
} from 'graphql';

import MemberType from './MemberType';

export default new GraphQLObjectType({
	name: 'Login',
	description: 'Login type object thing',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLInt),
			description: 'The id of the login.'
		},
		member: {
			type: MemberType,
			description: 'The member who owns this login.'
		},
		username: {
			type: GraphQLString,
			description: 'The user name of the member.'
		},
		secret: {
			type: GraphQLString,
			description: 'The password of the member.'
		}
	}
});
