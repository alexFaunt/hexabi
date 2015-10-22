import database from '../database';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} from 'graphql';

// our mapping to the DB
const table = database.Model.extend({
    tableName: 'games'
});

// the PostgreSQL string to create it just for doccing sake,
// maybe we can use it to auto generate the DB or something, or we can map
// between graphQL and postgre with graffiti when it's ready
const postgre = `CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    status text NOT NULL DEFAULT 'PENDING',
    lives numeric DEFAULT 3,
    infos numeric DEFAULT 8,
    deck text NOT NULL,
    played text NOT NULL,
    discard text NOT NULL
);`;

// Define the fields
const fields = {
    id: {
        type: GraphQLID
    },
    status: {
        type: GraphQLString
    },
    lives: {
        type: GraphQLInt
    },
    infos: {
        type: GraphQLInt
    },
    deck: {
        type: GraphQLString
    },
    played: {
        type: GraphQLString
    },
    discard: {
        type: GraphQLString
    }
    //creator TODO - FK
};

// Our graph QL object
const schema = new GraphQLObjectType({
    name: 'Game',
    fields
});

export const queries = {
    game: {
        type: schema,
        args: {
            id: fields.id
        },
        resolve: (_, {id}) => {
            return table.where('id', id).fetch().then(function (user) {
                return user.toJSON();
            });
        }
    },

    games: {
        type: new GraphQLList(schema),
        description: 'get all games',
        resolve: () => {
            return table.fetchAll().then(function (games) {
                return games.toJSON();
            });
        }
    }
};

export const mutations = {};
