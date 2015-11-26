import toObject from '../utils/toObject';
import { GET_PROVIDER, GET_PROVIDERS, CREATE_PROVIDER } from '../actions/Provider';
import { SUCCESS } from '../constants/Response';

// Decide on structure, is this the best way?
const defaultState = {};

export default function providerReducer (state = defaultState, { type, status, data }) {

    // Don't even care about pending / failures yet, but this is how you can access them.
    if (status !== SUCCESS) {
        return state;
    }

    switch (type) {
        case CREATE_PROVIDER:
            return Object.assign({}, state, {
                [data.createProvider.id]: data.createProvider
            });

        case GET_PROVIDER:
            return Object.assign({}, state, {
                [data.provider.id]: data.provider
            });

        case GET_PROVIDERS:
            return toObject(data.providers);

        default:
            return state;
    }
}
