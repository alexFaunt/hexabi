import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLID
} from 'graphql';

import * as fields from './defs';

let count = 0;

const query = new GraphQLObjectType({
    name: 'Query',
    fields
});

export default new GraphQLSchema({
    query: query
});
