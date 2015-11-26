import database from '../database';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean
} from 'graphql';

import ProviderType from '../schema/ProviderType';
import ProviderModel from '../models/Provider';

export const createProvider = {
    type: ProviderType,
    args: {
        member: {
            name: 'member',
            type: GraphQLID
        },
        type: {
            name: 'type',
            type: GraphQLString
        }
    },
    resolve: function (obj, { member, type }) {
        return (new ProviderModel())
            .save({ member, type })
            .then(function (model) {
                return {
                    id: model.id, member, type
                };
            }, function () {
                console.error(arguments);
            });
    }
};
