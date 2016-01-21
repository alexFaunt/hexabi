import { SET_OVERLAYS } from '../actions/Overlay';

const defaultState = {
	menu: false
};

export default function overlayReducer (state = defaultState, { type, overlays }) {
	switch (type) {
		case SET_OVERLAYS:
			return Object.assign({}, state, overlays);

		default:
			return state;
	}
}
