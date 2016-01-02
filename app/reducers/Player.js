import toObject from '../utils/toObject';
import { GET_PLAYER, GET_PLAYERS, CREATE_PLAYER } from '../actions/Player';
import { SUCCESS } from '../constants/Response';

// Decide on structure, is this the best way?
const defaultState = {};

export default function playerReducer (state = defaultState, { type, status, data }) {

	// Don't even care about pending / failures yet, but this is how you can access them.
	if (status !== SUCCESS) {
		return state;
	}

	switch (type) {
		case CREATE_PLAYER:
			return Object.assign({}, state, {
				[data.createPlayer.id]: data.createPlayer
			});

		case GET_PLAYER:
			return Object.assign({}, state, {
				[data.player.id]: data.player
			});

		case GET_PLAYERS:
			return toObject(data.players);

		default:
			return state;
	}
}
