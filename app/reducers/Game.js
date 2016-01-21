import toObject from '../utils/toObject';
import { GET_GAME, GET_GAMES, CREATE_GAME } from '../actions/Game';
import { SUCCESS } from '../constants/Response';

// Decide on structure, is this the best way?
const defaultState = {};

export default function gameReducer (state = defaultState, { type, status, data }) {

	// Don't even care about pending / failures yet, but this is how you can access them.
	if (status !== SUCCESS) {
		return state;
	}

	switch (type) {
		case CREATE_GAME:
			return Object.assign({}, state, {
				[data.createGame.id]: data.createGame
			});

		case GET_GAME:
			return Object.assign({}, state, {
				[data.game.id]: data.game
			});

		case GET_GAMES:
			return toObject(data.games);

		default:
			return state;
	}
}
