import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql';

import queries from '../queries';
import mutations from '../mutations';

const query = new GraphQLObjectType({
    name: 'Query',
    fields: queries
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: mutations
});

export default new GraphQLSchema({
    query,
    mutation
});
