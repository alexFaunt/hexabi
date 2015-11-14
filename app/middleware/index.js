import api from './api';
import auth from './auth';

import clientTransition from './client/transition';
import serverTransition from './server/transition';

const common = [api, auth];

export const GET_GAMES = 'games';
export const client = common.concat(clientTransition);
export const server = common.concat(serverTransition);
