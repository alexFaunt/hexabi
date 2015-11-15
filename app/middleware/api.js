import api from '../services/api';
import * as ErrorConstants from '../constants/Errors';
import { QUERY, MUTATION } from '../constants/Api';
import { PENDING, SUCCESS, FAILURE } from '../constants/Response';

export default store => next => action => {
    const { query, mutation, type, ...rest } = action;

    let requestData;
    if (query) {
        requestData = query;
        requestData.type = QUERY;
    }
    else if (mutation) {
        requestData = mutation;
        requestData.type = MUTATION;
    }
    else {
        return next(action);
    }

    // This isn't used, and needs enumifying before it is
    // but this is how to show loading states
    next({ ...rest, type: type, status: PENDING });

    requestData.method = type;

    // If we've got a token, add it to the request
    const session = store.getState().Session;
    if (session.token) {
        requestData.token = session.token
    }

    // Fire off a request
    return api(requestData)
        .then(function (res) {
            next({ ...rest, data: res.data, type, status: SUCCESS });
        }, function ({ status }) {
            next({
                ...rest, type,
                status: FAILURE,
                data: {
                    code: status
                }
            });
        });
};
