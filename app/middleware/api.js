import api from '../services/api';
import * as Router from '../actions/Router';
import * as ErrorConstants from '../constants/Errors';

export default store => next => action => {
    const { query, mutation, type, ...rest } = action;

    let requestData;
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

    // This isn't used, and needs enumifying before it is
    // but this is how to show loading states
    next({ ...rest, type: type + '_PENDING' });

    requestData.method = type;

    const session = store.getState().Session;
    if (session.token) {
        requestData.token = session.token
    }

    return api(requestData)
        .then(function (res) {
            console.log('SUCCESS GAMES', res);
            next({ ...rest, res, type });
            return true;
        })
        .catch(function (error) {
            // TODO - it's possible to have other error types other than auth failures
            // They can go here and decide what action to pass on.

            next({
                type: ErrorConstants.AUTH_ERROR,
                error
            });

            // Another benefit is being able to log all failures here
            console.log(error);
            return false;
        });
};
