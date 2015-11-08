import { createStore, applyMiddleware } from 'redux';

import auth from '../middleware/auth';
import api from '../middleware/api';
import error from '../middleware/error';

export default applyMiddleware(api, auth, error)(createStore);
