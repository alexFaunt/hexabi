import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';

import defs from '../queries';

const query = new GraphQLObjectType({
    name: 'Query',
    fields: defs.queries
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: defs.mutations
});

export default new GraphQLSchema({
    query,
    mutation
});
