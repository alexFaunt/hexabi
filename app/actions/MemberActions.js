import ApiKeywords from '../../enums/ApiKeywords';

export const CREATE_MEMBER = 'CREATE_MEMBER';
export const GET_MEMBER = 'MEMBER';
export const GET_MEMBERS = 'MEMBERS';

const response = {
	id: true,
	name: true,
	avatar: true,
	playingGames: {
		name: true,
		status: true
	},
	players: {
		focus: true,
		game: {
			creator: {
				name: true
			},
			name: true,
			status: true,
			players: {
				id: true
			}
		}
	}
};

export function createMember (params) {
	return {
		type: CREATE_MEMBER,
		query: { params, response }
	};
}

export function getMember (params) {
	return {
		type: GET_MEMBER,
		query: { params, response }
	};
}

export function getCurrentMember () {
	return {
		type: GET_MEMBER,
		query: {
			params: {
				id: ApiKeywords.CURRENT_USER_ID
			},
			response
		}
	};
}

export function getMembers () {
	return {
		type: GET_MEMBERS,
		mutation: { response }
	};
}
