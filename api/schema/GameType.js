import PlayerType from './PlayerType';
import MemberType from './MemberType';

import {
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean
} from 'graphql'

export default new GraphQLObjectType({
    name: 'Game',
    description: 'Game type object thing',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description: 'The id of the game.',
        },
        creator: {
            type: MemberType,
            description: 'The creatore of the game.',
        },
        players: {
            type: new GraphQLList(PlayerType),
            description: 'Players in this game',
        },
        status: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The status of the game'
        },
        lives: {
            type: GraphQLInt,
            description: 'The lives of the game'
        },
        infos: {
            type: GraphQLInt,
            description: 'The infos of the game'
        },
        deck: {
            type: GraphQLString,
            description: 'The deck of the game'
        },
        played: {
            type: GraphQLString,
            description: 'The played of the game'
        },
        discard: {
            type: GraphQLString,
            description: 'The discard of the game'
        }
    }
});
