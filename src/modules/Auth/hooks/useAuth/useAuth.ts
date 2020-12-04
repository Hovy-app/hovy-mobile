import {useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useDispatchRequest} from '@redux-requests/react';

import {login as loginRequest, setUserData, UserDataType} from '../../reducer';
import {useErrorHandler} from '../../../Error/hooks/useErrorHandler';
import {
  saveDataToLocalStorage,
  removeDataFromLocalStorage,
} from '../../../../utils/storageUtils';
import {RootState} from '../../../../redux/store';

export type UseAuthType = {
  login: (
    login: string,
    password: string
  ) => Promise<UserDataType | null | void>;
  logout: () => Promise<void>;
  userData: UserDataType | null;
  isLoading: boolean;
};

export const isValidUserType = (data: unknown): data is UserDataType => {
  if ((data as UserDataType).id) return true;
  return false;
};

export const useAuth = (): UseAuthType => {
  const dispatch = useDispatchRequest();
  const {handleError} = useErrorHandler();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userData = useSelector<RootState, UserDataType | null>(
    (state) => state.authReducer.userData
  );

  const login = useCallback(
    async (
      userLogin: string,
      userPassword: string
    ): Promise<UserDataType | null | void> => {
      try {
        setIsLoading(true);
        const result = await dispatch(loginRequest(userLogin, userPassword));
        if (result.error) throw result.error;

        if (result.data?.code === 0) {
          const {
            id,
            name,
            last_name: lastName,
            patronymic,
            email,
            phone,
            address,
            description,
            token,
            create_date: createDate,
          } = result.data?.data ?? {};

          const userDataLocal = {
            id,
            name,
            lastName,
            patronymic,
            login: userLogin,
            email,
            phone,
            address,
            description,
            token,
            createDate,
          };

          if (isValidUserType(userDataLocal)) {
            await saveDataToLocalStorage(
              'userData',
              JSON.stringify(userDataLocal)
            );
            const userResult = await dispatch(setUserData(userDataLocal));
            if (userResult.error) throw userResult.error;
            setIsLoading(false);

            return userDataLocal;
          }
        }
        throw new Error();
      } catch (err) {
        setIsLoading(false);
        handleError(err);
      }
    },
    [dispatch, handleError]
  );

  const logout = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const userResult = await dispatch(setUserData(null));
      if (userResult.error) throw userResult.error;
      await removeDataFromLocalStorage('userData');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      handleError(err);
    }
  }, [dispatch, handleError]);

  return {
    login,
    logout,
    userData,
    isLoading,
  };
};
