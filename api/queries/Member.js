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

const DEFAULT_SCORE = 0;

export const member = {
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
};

export const members = {
    type: new GraphQLList(MemberType),
    description: 'get all members',
    resolve: function () {
        return MemberModel
            .fetchAll()
            .then((members) => members.toJSON());
    }
};
