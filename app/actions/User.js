export const CREATE_USER = 'CREATE_USER';

import request from 'axios';

const BACKEND_URL = 'https://webtask.it.auth0.com/api/run/wt-milomord-gmail_com-0/redux-tutorial-backend?webtask_no_cache=1';
export function createUser (name) {
    return {
        type: CREATE_USER,
        promise: request.post(BACKEND_URL, { name })
    }
}
