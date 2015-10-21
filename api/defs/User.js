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

// Define the fields
const fields = {
    id: {
        type: GraphQLID
    },
    name: {
        type: GraphQLString
    }
};

// Our graph QL object
const schema = new GraphQLObjectType({
    name: 'User',
    fields
});

export default {
    type: schema,
    args: {
        id: fields.id
    },
    resolve: (_, {id}) => {
        console.log(id);

        return table.where('id', id).fetch().then(function (user) {
            return user.toJSON();
        });
    }
}
