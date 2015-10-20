import database from '../database';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} from 'graphql';

// our mapping to the DB
const table = database.Model.extend({
    tableName: 'users'
});

// the PostgreSQL string to create it just for doccing sake,
// maybe we can use it to auto generate the DB or something, or we can map
// between graphQL and postgre with graffiti when it's ready
const postgre = `CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name text
)`;

// Our graph QL object
const schema = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        }
    })
});

export default {
    type: schema,
    resolve () {
        // TODO - I can't seem to pass in the id and get what i want.
        //"message": "Unknown argument \"id\" on field \"user\" of type \"Query\"."
        return table.where('id', 2).fetch().then(function (user) {
            return user.toJSON();
        });
    }
}
