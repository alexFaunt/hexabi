import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLID
} from 'graphql';

import { queries, mutations } from './defs';

let count = 0;

const query = new GraphQLObjectType({
    name: 'Query',
    fields: queries
});

export default new GraphQLSchema({
    query: query
});
