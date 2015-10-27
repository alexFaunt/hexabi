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
        resolve: (_, {id}) => {
            return MemberModel.where('id', id).fetch().then(function (member) {
                return member.toJSON();
            });
        }
    },

    members: {
        type: new GraphQLList(MemberType),
        description: 'get all members',
        resolve: () => {
            console.log('GET ALL USERS FROM TABLE');
            return MemberModel.fetchAll().then(function (members) {
                console.log(members.toJSON());
                return members.toJSON();
            });
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
        resolve: (obj, {name, avatar}) => {
            console.log('create member', name, avatar);
            return (new MemberModel()).save({name, avatar}).then((model) => {
                console.log('Member created', model.id, name, avatar, DEFAULT_SCORE);
                return {
                    id: model.id, name, avatar, score: DEFAULT_SCORE
                };
            }, function () {
                console.log(arguments);
            })
        }
      }
}
