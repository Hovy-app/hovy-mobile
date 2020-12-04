import {combineReducers} from '@reduxjs/toolkit';

import authReducer from '../modules/Auth/reducer';
import eventsReducer from '../modules/Events/reducer';
import ordersReducer from '../modules/Orders/reducer';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const rootReducer = (additionalReducers = {}) => {
  return combineReducers({
    authReducer,
    eventsReducer,
    ordersReducer,
    ...additionalReducers,
  });
};

export default rootReducer;
