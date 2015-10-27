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
        resolve: (_, {id}) => {
            return PlayerModel.where('id', id).fetch().then(function (player) {
                return player.toJSON();
            });
        }
    },

    players: {
        type: new GraphQLList(PlayerType),
        description: 'get all players',
        resolve: () => {
            console.log('try get all players');
            return PlayerModel.fetchAll({withRelated: ['member']}).then(function (players) {
                console.log(players.toJSON());
                return players.toJSON();
            });
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
        resolve: (obj, {member, hand}) => {
            console.log('create player', member, hand);
            return (new PlayerModel()).save({member, hand}).then((model) => {
                return {
                    id: model.id, member, hand
                };
            }, function () {
                console.log(arguments);
            })
        }
      }
}
