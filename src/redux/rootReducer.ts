import {combineReducers} from '@reduxjs/toolkit';

import authReducer from '../modules/Auth/reducer';
import scannerReducer from '../modules/Scanner/reducer';
import queueReducer from '../modules/Queue/reducer';
import feedbackReducer from '../modules/Feedback/reducer';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const rootReducer = (additionalReducers = {}) => {
  return combineReducers({
    authReducer,
    scannerReducer,
    queueReducer,
    feedbackReducer,
    ...additionalReducers,
  });
};

export default rootReducer;
