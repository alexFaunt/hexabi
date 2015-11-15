import morph from 'morph';
import * as authService from '../services/auth';
import { PENDING, SUCCESS, FAILURE } from '../constants/Response';

export default store => next => action => {
    const { auth, type, ...rest } = action;

    if (!auth) {
        return next(action);
    }

    // See comments in api middleware
    next({ ...rest, type: type, status: PENDING });

    const session = store.getState().Session;

    if (session.token) {
        auth.token = session.token
    }

    return authService[morph.toCamel(type)](auth)
        .then(function (res) {
            next({ ...rest, data: res.data, type, status: SUCCESS });
        }, function (res) {
            next({ ...rest, type, status: FAILURE });
        });
};
