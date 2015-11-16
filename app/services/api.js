import config from '../../server/config/server-config';
import axios from 'axios';
import Promise from 'promise';
import morph from 'morph';

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

export default function (opts) {
    const { type, method, params, response, token } = opts;

    let data = morph.toCamel(type) + ' { ' + morph.toCamel(method) + ' ';

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

    const headers = {
        'Content-Type': 'application/graphql',
    };

    if (token) {
        headers.token = token;
    }

    // Return axios to the api end point
    return axios({
        url: 'http://localhost:' + config.port + '/api',
        method: 'post',
        headers,
        data
    });
};
