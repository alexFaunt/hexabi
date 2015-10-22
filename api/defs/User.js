import database from '../database';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
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
    name text NOT NULL,
    avatar text,
    score numeric DEFAULT 0
);`;

// Define the fields
const fields = {
    id: {
        type: GraphQLID
    },
    name: {
        type: GraphQLString
    },
    avatar: {
        type: GraphQLString
    },
    score: {
        type: GraphQLInt
    }
};

// Our graph QL object
const type = new GraphQLObjectType({
    name: 'User',
    fields
});

export const queries = {
    user: {
        type: type,
        description: 'Return user by id',
        args: {
            id: fields.id
        },
        resolve: (_, {id}) => {
            return table.where('id', id).fetch().then(function (user) {
                return user.toJSON();
            });
        }
    },

    users: {
        type: new GraphQLList(type),
        description: 'get all users',
        resolve: () => {
            return table.fetchAll().then(function (users) {
                return users.toJSON();
            });
        }
    }
}

export const mutations = {
    createUser: {
        type: type,
        args: {
            name: {
                name: 'name',
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: (obj, {name}) => {
            console.log('do a save with ' + name);
            return (new table()).save({name});
        }
      }
}
