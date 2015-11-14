import {ROUTER_DID_CHANGE} from 'redux-router/lib/constants';
import fetchComponentData from '../../utils/fetchComponentData';

const locationsAreEqual = function (locA, locB) {
    return (locA.pathname === locB.pathname) && (locA.search === locB.search);
};

export default ({getState, dispatch}) => next => action => {
    if (action.type === ROUTER_DID_CHANGE) {
        if (getState().router && locationsAreEqual(action.payload.location, getState().router.location)) {
            return next(action);
        }

        const {components, params} = action.payload;

        const promise = fetchComponentData(dispatch, components, params)
            .then(function () {
                next(action);
            });

        // Taken from redux example - it so we can wait for the router
        // before we render server side.

        // This one line is a super important hack.
        getState().router = promise;

        return promise;
  }

  return next(action);
};
