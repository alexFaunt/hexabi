import database from '../database';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import GameModel from '../models/Game';
import GameType from '../schema/GameType';

const fetchProps = {
    withRelated: [
        'creator', 'players', 'players.member'
    ]
};

export const queries = {
    game: {
        type: GameType,
        args: {
            id: {
                name: 'id',
                type: GraphQLInt,
                description: 'id of the game to fetch.'
            },
        },
        resolve: function (_, {id}) {
            return (new GameModel())
                .where('id', id)
                .fetch(fetchProps)
                .then((games) => games.toJSON());
        }
    },

    games: {
        type: new GraphQLList(GameType),
        description: 'get all games',
        resolve: function () {
            return (new GameModel())
                .fetchAll(fetchProps)
                .then((games) => games.toJSON());
        }
    }
};

export const mutations = {
    createGame: {
        type: GameType,
        args: {
            deck: {
                name: 'deck',
                type: GraphQLString
            },
            creator: {
                name: 'creator',
                type: GraphQLID
            }
        },
        resolve: function (obj, {deck, creator}) {
            return (new GameModel())
                .save({deck, creator})
                .then(function (model) {
                    return {
                        id: model.id, deck, creator
                    };
                }, function () {
                    console.error(arguments);
                });
        }
      }
}
