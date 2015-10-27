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

export const createGame = {
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
};
