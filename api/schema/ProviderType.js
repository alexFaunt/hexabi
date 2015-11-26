import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean
} from 'graphql';

import MemberType from './MemberType';

export default new GraphQLObjectType({
    name: 'Provider',
    description: 'Provider type object thing',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The id of the provider.',
        },
        member: {
            type: MemberType,
            description: 'The member who is this provider.',
        },
        type: {
            type: GraphQLString,
            description: 'The position of this provider.',
        }
    }
});
