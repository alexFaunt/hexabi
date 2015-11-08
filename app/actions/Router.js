import * as auth from '../services/auth';

export const NAVIGATE = 'NAVIGATE';

export function navigate (route, data) {
    return {
        type: NAVIGATE,
        route,
        data
    };
};
