import database from '../database';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

import GameModel from '../models/Game';
import GameType from '../schema/GameType';

const fetchProps = {
    withRelated: [
        'creator', 'players', 'players.member'
    ]
};

export const game = {
    type: GameType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt,
            description: 'id of the game to fetch.'
        },
    },
    resolve: function (_, {id}) {
        return (new GameModel())
            .where('id', id)
            .fetch(fetchProps)
            .then((games) => games.toJSON());
    }
};

export const games = {
    type: new GraphQLList(GameType),
    description: 'get all games',
    resolve: function () {
        return (new GameModel())
            .fetchAll(fetchProps)
            .then((games) => games.toJSON());
    }
};