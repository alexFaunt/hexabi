import axios from 'axios';
import Promise from 'promise';

import config from '../../server-config';

function getResponseString (obj) {
    const resp = [];

    for (let prop in obj) {
        if (!obj.hasOwnProperty(prop)) {
            continue;
        }

        if (typeof(obj[prop]) === 'object') {
            resp.push(prop + ' ' + getResponseString(obj[prop]));
            continue;
        }

        resp.push(prop);
    }

    return '{ ' + resp.join(', ') + ' }';
}

function createRequest (type, method, params, response) {

    let data = type + ' { ' + method + ' ';

    if (params) {
        // For each of the params
        const paramArray = [];
        for (let prop in params) {
            if (!params.hasOwnProperty(prop)) {
                continue;
            }
            paramArray.push(prop + ': "' + params[prop] + '"');
        }

        data += '( ' + paramArray.join(', ') + ' ) ';
    }

    if (response) {
        // concat all the responses through recursion
        data += getResponseString(response);
    }

    data += ' }';

    // Return axios to the api end point
    return axios({
        url: 'http://localhost:' + config.port + '/api',
        method: 'post',
        headers: {
            'Content-Type': 'application/graphql'
        },
        data
    });

};

export default {
    query: (...args) => { return createRequest('query', ...args); },
    mutation: (...args) => { return createRequest('mutation', ...args); }
}

if (typeof(window) !== 'undefined') {
    window.api = {
        query: (...args) => { return createRequest('query', ...args); },
        mutation: (...args) => { return createRequest('mutation', ...args); }
    };
}
