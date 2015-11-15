import api from './api';
import auth from './auth';
import transition from './transition';

const common = [api, auth];

export const client = common.concat(transition(false));
export const server = common.concat(transition(true));
