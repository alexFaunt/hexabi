import database from '../database';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean
} from 'graphql';
import * as Game from './Game';
import * as Member from './Member';

// our mapping to the DB
const Model = database.Model.extend({
    tableName: 'players',
    member: function () {
        return this.belongsTo(Member.Model, 'member');
    }
});

// the PostgreSQL string to create it just for doccing sake,
// maybe we can use it to auto generate the DB or something, or we can map
// between graphQL and postgre with graffiti when it's ready
const postgre = `CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    member integer references members(id),
    position integer,
    hand text,
    focus boolean DEFAULT FALSE,
    finished boolean DEFAULT FALSE
);`;
//INSERT INTO players (member, hand, focus) VALUES (1, 'test2', TRUE);

const postgre2 = `CREATE TABLE games_players (
    id SERIAL PRIMARY KEY,
    game_id integer references games(id),
    player_id integer references players(id)
);`;

// Define the fields
const fields = {
    id: {
        type: GraphQLID
    },
    member: {
        type: Member.type
    },
    position: {
        type: GraphQLInt
    },
    hand: {
        type: GraphQLString
    },
    focus: {
        type: GraphQLBoolean
    },
    finished: {
        type: GraphQLBoolean
    }
};

// Our graph QL object
export const type = new GraphQLObjectType({
    name: 'Player',
    fields
});

export const queries = {
    player: {
        type,
        description: 'get player by id',
        args: {
            id: fields.id
        },
        resolve: (_, {id}) => {
            return Model.where('id', id).fetch().then(function (player) {
                return player.toJSON();
            });
        }
    },

    players: {
        type: new GraphQLList(type),
        description: 'get all players',
        resolve: () => {
            console.log('try get all players');
            return Model.fetchAll({withRelated: ['member']}).then(function (players) {
                console.log(players.toJSON());
                return players.toJSON();
            });
        }
    }
};

export const mutations = {
    createPlayer: {
        type: type,
        args: {
            member: {
                name: 'member',
                type: GraphQLID
            },
            hand: {
                name: 'hand',
                type: GraphQLString
            }
        },
        resolve: (obj, {member, hand}) => {
            console.log('create player', member, hand);
            return (new Model()).save({member, hand}).then((model) => {
                return {
                    id: model.id, member, hand
                };
            }, function () {
                console.log(arguments);
            })
        }
      }
}
