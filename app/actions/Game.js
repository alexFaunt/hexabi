import api from '../services/api';

export const CREATE_GAME = 'createGame';
export const GET_GAME = 'game';
export const GET_GAMES = 'games';

const response = {
    id: true,
    creator: {
        id: true,
        name: true
    },
    players: {
        hand: true,
        member: {
            id: true,
            name: true
        }
    }
};

export function createGame (params) {

    // params.creator = current user.

    return {
        type: CREATE_GAME,
        promise: api.mutation(CREATE_GAME, params, {
            id: true
        })
    };
};

export function getGame (id) {
    return {
        type: GET_GAME,
        promise: api.query(GET_GAME, {id}, response)
    }
};

export function getGames () {
    return {
        type: GET_GAMES,
        promise: api.query(GET_GAMES, null, response)
    }
};
