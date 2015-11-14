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

console.log('TRANSITON MIDDLE WARE FETCHING ');
        const promise = fetchComponentData(dispatch, components, params)
            .then(function () {
                next(action);
            })
            .catch(function (error) {
                // TODO: You may want to handle errors for fetchData here
                console.warn('Warning: Error in fetchData', error);
                return doTransition();
            });

        // Taken from redux example - it so we can wait for the router
        // before we render server side.
            console.log('SET ROUTER = promise');
            getState().router = promise;
            // console.log(getState());

        return promise;
  }

  return next(action);
};
