import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLID
} from 'graphql';

let count = 0;

const user = new GraphQLObjectType({
    name: 'User',
    type: user,
    fields: {
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        }
    }
});


const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        count: {
            type: GraphQLInt,
            description: 'The count!',
            resolve: function () {
                return count;
            }
        },
        user: {
            type: user,
            resolve () {
                return {
                    id: '123',
                    name: 'Person name'
                }
            }
        }
    }
});

export default new GraphQLSchema({
    query: query
});
