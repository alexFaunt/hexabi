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

export const createMember = {
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
    resolve: function (_, {name, avatar}) {
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
};
