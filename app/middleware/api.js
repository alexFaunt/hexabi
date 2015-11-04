import api from '../services/api';

export default store => next => action => {
    const { query, mutation, type, ...rest } = action;

    let requestData;
    let endpointType;
    if (query) {
        requestData = query;
        requestData.type = 'query';
    }
    else if (mutation) {
        requestData = mutation;
        requestData.type = 'mutation';
    }
    else {
        return next(action);
    }

    const SUCCESS = type;
    const FAILURE = type + '_FAILURE';

    next({ ...rest, type: type + '_PENDING' });

    requestData.method = SUCCESS;

    const session = store.getState().Session;
    if (session.token) {
        requestData.token = session.token
    }

    return api(requestData)
        .then(function (res) {
            next({ ...rest, res, type: SUCCESS });
            return true;
        })
        .catch(function (error) {
            next({ ...rest, error, type: FAILURE });

            // Another benefit is being able to log all failures here
            console.log(error);
            return false;
        });
};
