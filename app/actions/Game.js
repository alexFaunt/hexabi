export const CREATE_GAME = 'CREATE_GAME';
export const GET_GAME = 'GAME';
export const GET_GAMES = 'GAMES';

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
        query: {
            params,
            response: { id }
        }
    };
};

export function getGame (id) {
    return {
        type: GET_GAME,
        query: {
            params: { id },
            response
        }
    }
};

export function getGames () {
    return {
        type: GET_GAMES,
        query: { response }
    }
};
