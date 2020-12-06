import {Store} from '@reduxjs/toolkit';
import {AxiosError, AxiosRequestConfig} from 'axios';

export const onApiRequest = (
  request: AxiosRequestConfig,
  requestAction: unknown,
  store: Store
): AxiosRequestConfig => {
  if (__DEV__)
    console.log('[API] Request to API...', JSON.stringify(requestAction));

  return {
    ...request,
    headers: {
      ...request.headers,
      'Content-Type': 'application/json',
    },
  };
};

export const onApiError = (err: AxiosError): AxiosError => {
  if (__DEV__)
    console.log(
      '[API] Error with request to API.',
      JSON.stringify(err.response)
    );

  // if (error?.response?.status === 401) {
  //   const refreshToken = await getDataFromLocalStorage('RefreshToken');

  //   const resp = await store.dispatch(refreshAccessToken(refreshToken));

  //   if (!resp) {
  //     throw error;
  //   }

  //   const {
  //     action: {
  //       payload: {
  //         data: {
  //           code: responseCode = null,
  //           message: responseMessage = null,
  //           data: responseData = {},
  //         } = {},
  //       } = {},
  //     } = {},
  //   } = resp;

  //   let {access: newAccessToken = null, refresh: newRefreshToken = null} =
  //     responseData ?? {};

  //   switch (responseCode) {
  //     case 0: {
  //       await saveDataToLocalStorage('AccessToken', newAccessToken);
  //       await saveDataToLocalStorage('RefreshToken', newRefreshToken);
  //       await store.dispatch(setUserTokens(newAccessToken, newRefreshToken));
  //       break;
  //     }
  //     case 226: {
  //       if (__DEV__) {
  //         console.log('TOKEN REFRESH: Срок токена истек. Авторизуемся заново.');
  //       }

  //       await saveDataToLocalStorage('AccessToken', '');
  //       await saveDataToLocalStorage('RefreshToken', '');
  //       await socialLogout();
  //       await store.dispatch(clearUser());
  //       await store.dispatch(setUserTokens(null, null));
  //       Toast.show(translate('auth.noLongerVisit'));

  //       throw error;
  //     }
  //     case 227: {
  //       if (__DEV__) {
  //         console.log('TOKEN REFRESH: Токен еще валиден.');
  //       }
  //       newAccessToken = await store.getState()?.authReducer?.userTokens
  //         ?.accessToken;
  //       break;
  //     }
  //     default: {
  //       throw error;
  //     }
  //   }

  //   const newResponse = await store.dispatch({
  //     ...requestAction,
  //     request: {
  //       ...requestAction.request,
  //       headers: {
  //         ...requestAction.request.headers,
  //         Authorization: 'Bearer ' + newAccessToken,
  //       },
  //     },
  //     meta: {
  //       ...requestAction.meta,
  //       silent: true,
  //       runOnError: false,
  //       runOnSuccess: false,
  //     },
  //   });

  //   if (newResponse.data) {
  //     return {data: newResponse.data};
  //   }
  // }

  throw err;
};
