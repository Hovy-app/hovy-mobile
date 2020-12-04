import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {handleRequests} from '@redux-requests/core';
import {createDriver} from '@redux-requests/axios';
import axios from 'axios';

import createAppRootReducer from './rootReducer';
import {config} from '../utils/config';
import {onApiError, onApiRequest} from '../utils/interceptors';

const {requestsReducer, requestsMiddleware} = handleRequests({
  driver: {
    default: createDriver(
      axios.create({
        baseURL: config.api.url,
        responseType: 'json',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Ifactor-Application-Android': 1,
        },
      })
    ),
  },
  onRequest: onApiRequest,
  onError: onApiError,
  cache: true,
});

const store = configureStore({
  reducer: createAppRootReducer({
    requests: requestsReducer,
  }),
  middleware: [
    ...requestsMiddleware,
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload', 'meta.requestAction'],
        ignoredPaths: ['requests'],
      },
    }),
  ],
});

export type StoreType = typeof store;
export type RootState = ReturnType<typeof store.getState>;

export default store;
