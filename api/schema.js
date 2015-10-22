import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLID
} from 'graphql';

import defs from './defs';

let count = 0;

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
