import axios from 'axios';

import config from '../../server-config';

export const CREATE_USER = 'CREATE_USER';
export const GET_USERS = 'GET_USERS';

const API = 'http://localhost:' + config.port + '/api'

export function createUser (name) {
    return {
        type: CREATE_USER,
        promise: axios({
            url: API,
            method: 'post',
            headers: {
                'Content-Type': 'application/graphql'
            },
            data: 'mutation { createUser (name: "' + name + '") {id} }'
        })
    }
};
