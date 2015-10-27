import database from '../database';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';
import * as Member from './Member';

// our mapping to the DB
export const Model = database.Model.extend({
    tableName: 'games',
    creator: function () {
        return this.belongsTo(Member.Model, 'creator');
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
    creator integer NOT NULL references members(id)
);`;
// INSERT INTO games (deck, creator) VALUES ('decktest', 1)

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
        type: Member.type
    }
};

// Our graph QL object
export const type = new GraphQLObjectType({
    name: 'Game',
    fields
});

export const queries = {
    game: {
        type,
        args: {
            id: fields.id
        },
        resolve: (_, {id}) => {
            console.log('Fetch a gamE!');
            return Model.where('id', id).fetch().then(function (game) {
                return game.toJSON();
            });
        }
    },

    games: {
        type: new GraphQLList(type),
        description: 'get all games',
        resolve: () => {
            return Model.fetchAll({withRelated: ['creator']}).then(function (games) {
                return games.toJSON();
            });
        }
    }
};

export const mutations = {
    createGame: {
        type: type,
        args: {
            deck: {
                name: 'deck',
                type: GraphQLString
            },
            creator: {
                name: 'creator',
                type: GraphQLID // TODO - get type from MEmber
            }
        },
        resolve: (obj, {deck, creator}) => {
            console.log('create game', deck, creator);
            return (new Model()).save({deck, creator}).then((model) => {
                console.log('Game created', model.id, deck, creator);
                return {
                    id: model.id, deck, creator
                };
            }, function () {
                console.log(arguments);
            })
        }
      }
}
