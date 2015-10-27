import database from '../database';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import MemberType from '../schema/MemberType';
import MemberModel from '../models/Member';

export const DEFAULT_SCORE = 0;

export const queries = {
    member: {
        type: MemberType,
        description: 'Return member by id',
        args: {
            id: {
                type: GraphQLString,
                name: 'id'
            }
        },
        resolve: function (_, {id}) {
            return MemberModel
                .where('id', id)
                .fetch()
                .then((member) => member.toJSON());
        }
    },

    members: {
        type: new GraphQLList(MemberType),
        description: 'get all members',
        resolve: function () {
            return MemberModel
                .fetchAll()
                .then((members) => members.toJSON());
        }
    }
}

export const mutations = {
    createMember: {
        type: MemberType,
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
        resolve: function (obj, {name, avatar}) {
            return (new MemberModel())
                .save({name, avatar})
                .then(function (model) {
                    return {
                        id: model.id, name, avatar, score: DEFAULT_SCORE
                    };
                }, function () {
                    console.error(arguments);
                });
        }
      }
}
