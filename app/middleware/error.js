import * as ErrorConstants from '../constants/Errors';
import * as Router from '../actions/Router';

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
