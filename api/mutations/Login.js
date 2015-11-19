import config from '../../server/config/server-config';
import bcrypt from 'bcrypt';
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

export const register = {
    type: LoginType,
    args: {
        secret: {
            type: GraphQLString,
            name: 'secret'
        },
        username: {
            type: GraphQLString,
            name: 'username'
        },
        password: {
            type: GraphQLString,
            name: 'password'
        },
        member: {
            type: GraphQLInt,
            name: 'member'
        }
    },
    resolve: function (_, { secret, username, password, member }) {
console.log('REgister end point', secret === config.auth.secret, username, password, member);
        // TODO - Need to block this from being accessed some how...
        // Even if you have a token you aren't allowed to poll this lol...
        // TODO - how do i keep my secret safe on the server side?
        if (secret !== config.auth.secret) {
            // The fuck you doing to me
            // Pretty sure this is bullshit.
            return Promise.reject();
        }

        // TODO - server side validation

        // generating a hash
        return new Promise(function (resolve, reject) {
            bcrypt.genSalt(10, function(err, salt) {
                if (err) {reject();}

                bcrypt.hash(config.auth.secret, salt, function (err, secret) {
                    if (err) {reject();}
console.log('ATTEMPT SAVE', member, username, secret);

                    return (new LoginModel())
                        .save({ member, username, secret })
                        .then(function (model) {
                            resolve({
                                id: model.id
                            })
                        }, function () {
                            console.error(arguments);
                            reject(arguments);
                        });
                });
            });
        });
    }
};
