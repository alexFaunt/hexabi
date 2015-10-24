import database from '../database';
import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} from 'graphql';

export const DEFAULT_SCORE = 0;

// our mapping to the DB
export const Model = database.Model.extend({
    tableName: 'members'
});

// the PostgreSQL string to create it just for doccing sake,
// maybe we can use it to auto generate the DB or something, or we can map
// between graphQL and postgre with graffiti when it's ready
const postgre = `CREATE TABLE members (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    avatar text,
    score integer DEFAULT 0
);`;

// Define the fields
const fields = {
    id: {
        type: GraphQLID
    },
    name: {
        type: GraphQLString
    },
    avatar: {
        type: GraphQLString
    },
    score: {
        type: GraphQLInt
    }
};

// Our graph QL object
export const type = new GraphQLObjectType({
    name: 'Member',
    fields
});

export const queries = {
    member: {
        type,
        description: 'Return member by id',
        args: {
            id: fields.id
        },
        resolve: (_, {id}) => {
            return Model.where('id', id).fetch().then(function (member) {
                return member.toJSON();
            });
        }
    },

    members: {
        type: new GraphQLList(type),
        description: 'get all members',
        resolve: () => {
            console.log('GET ALL USERS FROM TABLE');
            return Model.fetchAll().then(function (members) {
                console.log(members.toJSON());
                return members.toJSON();
            });
        }
    }
}

export const mutations = {
    createMember: {
        type: type,
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
            return (new Model()).save({name, avatar}).then((model) => {
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
