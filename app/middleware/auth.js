import * as authService from '../services/auth';
import { pushState } from 'redux-router';

export default store => next => action => {
    const { auth, type, ...rest } = action;

    if (!auth) {
        return next(action);
    }

    const SUCCESS = type;
    const FAILURE = type + '_FAILURE'; // TODO - not this

    // See comments in api middleware
    next({ ...rest, type: type + '_PENDING' }); // TODO - not this

    const session = store.getState().Session;
    if (session.token) {
        auth.token = session.token
    }

    return authService[type](auth)
        .then(function (res) {
            next({ ...rest, res, type });
            return true;
        })
        .catch(function (error) {
            next({ ...rest, error, type: FAILURE });

            // Another benefit is being able to log all failures here
            console.log(error);
            return false;
        });
};
