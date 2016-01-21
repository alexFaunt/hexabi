export const SET_OVERLAYS = 'SET_OVERLAYS';

export function openMenu () {
	return {
		type: SET_OVERLAYS,
		overlays: {
			menu: true
		}
	};
}

export function closeMenu () {
	return {
		type: SET_OVERLAYS,
		overlays: {
			menu: true
		}
	};
}
