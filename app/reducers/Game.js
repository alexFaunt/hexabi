import * as Game from '../actions/Game';

const defaultState = [];

export default function gameReducer (state = defaultState, action) {

    switch (action.type) {
        case Game.CREATE_GAME:
            return state.concat(action.res.data.getGame);
        case Game.GET_GAME:
            return action.res.data.game;
        case Game.GET_GAMES:
        console.log('hiiiii')
            console.log(action.res.data)
            return action.res.data.games;
        default:
            return state;
    }
}
