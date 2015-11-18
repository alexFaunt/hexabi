import database from '../database';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean
} from 'graphql';

import LoginType from '../schema/LoginType';
import LoginModel from '../models/Login';

export const login = {
    type: LoginType,
    description: 'get player by username',
    args: {
        username: {
            type: GraphQLString,
            name: 'username'
        },
        secret: {
            type: GraphQLString,
            name: 'secret'
        }
    },
    resolve: function (_, { username, secret }) {
        return LoginModel
            .where({ username, secret })
            .fetch({ withRelated: [ 'member' ] })
            .then(function (login) {
                return login && login.toJSON();
            });
    }
};
