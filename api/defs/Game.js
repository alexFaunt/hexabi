import database from '../database';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import * as User from './User';


// our mapping to the DB
const table = database.Model.extend({
    tableName: 'games',
    creator: function () {
        return this.hasOne(User.Model, 'id');
    }
});

// the PostgreSQL string to create it just for doccing sake,
// maybe we can use it to auto generate the DB or something, or we can map
// between graphQL and postgre with graffiti when it's ready
const postgre = `CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    status text NOT NULL DEFAULT 'PENDING',
    lives integer DEFAULT 3,
    infos integer DEFAULT 8,
    deck text,
    played text,
    discard text,
    creator integer references users(id)
);`;

// Define the fields
const fields = {
    id: {
        type: GraphQLID
    },
    status: {
        type: new GraphQLNonNull(GraphQLString)
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
    },
    creator: {
        type: User.type
    }
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
            return table.where('id', id).fetch().then(function (game) {
                return game.toJSON();
            });
        }
    },

    games: {
        type: new GraphQLList(schema),
        description: 'get all games',
        resolve: () => {
            return table.fetchAll({withRelated: ['creator']}).then(function (games) {
                return games.toJSON();
            });
        }
    }
};

export const mutations = {};
