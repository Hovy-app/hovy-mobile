import {useCallback} from 'react';
import {AxiosError} from 'axios';

import {
  InputError,
  NoDataError,
  isAxiosError,
  isInputError,
  isNoDataError,
  ERRORS,
} from '../../../../utils/errorUtils';
import {useAlert} from '../../../Alert/hooks/useAlert';

export type UseErrorHandlerType = {
  handleError: (
    error: Error | AxiosError,
    setIsError?: (s: boolean) => void
  ) => void;
};

export const useErrorHandler = (): UseErrorHandlerType => {
  const {showAlert} = useAlert();

  const showError = useCallback((): void => {
    showAlert({
      message: 'Ошибка запроса.',
      type: 'danger',
    });
  }, [showAlert]);

  const handleError = useCallback(
    (err: Error | AxiosError, setIsError?: (s: boolean) => void): void => {
      if (__DEV__) console.log('[Error]', JSON.stringify(err), typeof err);
      if (setIsError) setIsError(true);
      if (isAxiosError(err)) {
        const code = err.response?.data?.code;
        switch (code) {
          case 4: {
            throw new NoDataError();
          }
          case 41: {
            throw new InputError({
              code,
              data: [{inputName: 'login', message: ERRORS.loginIncorrect}],
            });
          }
          default: {
            showError();
            throw err;
          }
        }
      } else if (isInputError(err) || isNoDataError(err)) return;
      else {
        showError();
        throw err;
      }
    },
    [showError]
  );

  return {
    handleError,
  };
};
