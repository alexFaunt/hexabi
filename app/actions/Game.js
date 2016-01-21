export const CREATE_GAME = 'CREATE_GAME';
export const GET_GAME = 'GAME';
export const GET_GAMES = 'GAMES';
export const GET_MEMBER_GAMES = 'MEMBER_GAMES';

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
	},
	status: true,
	score: true,
	lives: true,
	infos: true,
	deck: true,
	played: true,
	discard: true,
	name: true
};

export function createGame (params) {
	// params.creator = current user.

	return {
		type: CREATE_GAME,
		query: {
			params,
			response: { id: true }
		}
	};
}

export function getGame (id) {
	return {
		type: GET_GAME,
		query: {
			params: { id },
			response
		}
	};
}

export function getGames (params) {
	return {
		type: GET_GAMES,
		query: { params, response }
	};
}

export function getMembersGames (member) {
	return {
		type: GET_MEMBER_GAMES,
		query: {
			params: { member },
			response
		}
	};
}
