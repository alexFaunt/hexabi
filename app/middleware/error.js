import * as ErrorConstants from '../constants/Errors';

export default store => next => action => {
    const { type, error } = action;

    if (!error) {
        return next(action);
    }

    switch (type) {
        case ErrorConstants.AUTH_ERROR:
            next({
                type: Router.NAVIGATE,
                route: 'login'
            })
            break;
        default:
            next(action);
    }
};
