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
        resolve: (_, {id}) => {
            console.log('Fetch a gamE!');
            return (new GameModel()).where('id', id).fetch().then(function (game) {
                return game.toJSON();
            });
        }
    },

    games: {
        type: new GraphQLList(GameType),
        description: 'get all games',
        resolve: () => {
            return (new GameModel()).fetchAll({
                withRelated: [
                    'creator', 'players', 'players.member'
                ]
            }).then(function (games) {
                return games.toJSON();
            });
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
        resolve: (obj, {deck, creator}) => {
            console.log('create game', deck, creator);
            return (new GameModel()).save({deck, creator}).then((model) => {
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
