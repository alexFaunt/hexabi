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
            })
            .catch(function (error) {
                // IF server is down this is what happens
                // TODO: You may want to handle errors for fetchData here
                console.warn('Warning: Error in fetchData', error);
                next(action);
            });

        return promise;
  }

  return next(action);
};
