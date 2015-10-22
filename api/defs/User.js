import database from '../database';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

export const DEFAULT_SCORE = 0;

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
    score numeric DEFAULT ` + DEFAULT_SCORE + `
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
            console.log('GET ALL USERS FROM TABLE');
            return table.fetchAll().then(function (users) {
                console.log(users.toJSON());
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
            },
            avatar: {
                name: 'avatar',
                type: GraphQLString
            }
        },
        resolve: (obj, {name, avatar}) => {
            return (new table()).save({name, avatar}).then((model) => {
                console.log('User created', model.id, name, avatar, DEFAULT_SCORE);
                return {
                    id: model.id, name, avatar, score: DEFAULT_SCORE
                };
            })
        }
      }
}
