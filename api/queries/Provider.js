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

export const provider = {
    type: ProviderType,
    description: 'get provider by id',
    args: {
        id: {
            type: GraphQLString,
            name: 'id'
        }
    },
    resolve: function (_, {id}) {
        return ProviderModel
            .where('id', id)
            .fetch()
            .then((provider) => provider.toJSON());
    }
}

export const providers = {
    type: new GraphQLList(ProviderType),
    description: 'get all providers',
    resolve: function () {
        return ProviderModel
            .fetchAll({ withRelated: ['member'] })
            .then((providers) => providers.toJSON());
    }
};
