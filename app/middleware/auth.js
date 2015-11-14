import * as authService from '../services/auth';

export default store => next => action => {
    const { auth, type, ...rest } = action;

    if (!auth) {
        return next(action);
    }

    const SUCCESS = type;
    const FAILURE = type + '_FAILURE';

    // See comments in api middleware
    next({ ...rest, type: type + '_PENDING' });

    const session = store.getState().Session;

    if (session.token) {
        auth.token = session.token
    }

    return authService[type](auth)
        .then(function (res) {
            next({ ...rest, res, type });
            return true;
        }, function (res) {
            next({ ...rest, type: FAILURE });
            return false;
        });
};
