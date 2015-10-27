import database from '../database';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean
} from 'graphql';

import PlayerType from '../schema/PlayerType';
import PlayerModel from '../models/Player';

export const queries = {
    player: {
        type: PlayerType,
        description: 'get player by id',
        args: {
            id: {
                type: GraphQLString,
                name: 'id'
            }
        },
        resolve: function (_, {id}) {
            return PlayerModel
                .where('id', id)
                .fetch()
                .then((player) => player.toJSON());
        }
    },

    players: {
        type: new GraphQLList(PlayerType),
        description: 'get all players',
        resolve: function () {
            return PlayerModel
                .fetchAll({withRelated: ['member']})
                .then((players) => players.toJSON());
        }
    }
};

export const mutations = {
    createPlayer: {
        type: PlayerType,
        args: {
            member: {
                name: 'member',
                type: GraphQLID
            },
            hand: {
                name: 'hand',
                type: GraphQLString
            }
        },
        resolve: function (obj, {member, hand}) {
            return (new PlayerModel())
                .save({member, hand})
                .then(function (model) {
                    return {
                        id: model.id, member, hand
                    };
                }, function () {
                    console.error(arguments);
                });
        }
    }
}
