export const CREATE_PLAYER = 'CREATE_PLAYER';
export const GET_PLAYER = 'PLAYER';
export const GET_PLAYERS = 'PLAYERS';

const response = {
	id: true,
	type: true,
	member: {
		id: true,
		name: true,
		avatar: true
	},
	position: true,
	hand: true,
	focus: true,
	finished: true
};

export function createPlayer (params) {
	return {
		type: CREATE_PLAYER,
		query: {
			params,
			response: { id: true }
		}
	};
}

export function getPlayer (id) {
	return {
		type: GET_PLAYER,
		query: {
			params: { id },
			response
		}
	};
}

export function getPlayers () {
	return {
		type: GET_PLAYERS,
		query: { response }
	};
}
