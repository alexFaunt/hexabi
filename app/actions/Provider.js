export const CREATE_PROVIDER = 'CREATE_PROVIDER';
export const GET_PROVIDER = 'PROVIDER';
export const GET_PROVIDERS = 'PROVIDERS';

const response = {
    id: true,
    type: true,
    member: {
        id: true,
        name: true
    }
};

export function createProvider (params) {
    // params.creator = current user.

    return {
        type: CREATE_PROVIDER,
        query: {
            params,
            response: { id }
        }
    };
};

export function getProvider (id) {
    return {
        type: GET_PROVIDER,
        query: {
            params: { id },
            response
        }
    }
};

export function getProviders () {
    return {
        type: GET_PROVIDERS,
        query: { response }
    }
};
