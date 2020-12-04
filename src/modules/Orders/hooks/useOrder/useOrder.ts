import {useState} from 'react';
import {useDispatchRequest} from '@redux-requests/react';

import {setOrderPresentsStatus} from '../../reducer';
import {useErrorHandler} from '../../../Error/hooks/useErrorHandler';

export type UseOrderType = {
  setPresentsStatus: (orderId: number, status: boolean) => Promise<void>;
  setIsPresentsStatusActive: (status: boolean) => void;
  isPresentsStatusActive: boolean;
  isPresentsStatusActiveLocal: boolean;
  isPresentsStatusLoading: boolean;
};

export const useOrder = (): UseOrderType => {
  const dispatch = useDispatchRequest();
  const {handleError} = useErrorHandler();

  const [
    isPresentsStatusActiveLocal,
    setIsPresentsStatusActiveLocal,
  ] = useState<boolean>(false);
  const [isPresentsStatusActive, setIsPresentsStatusActive] = useState<boolean>(
    false
  );
  const [isPresentsStatusLoading, setIsPresentsStatusLoading] = useState<
    boolean
  >(false);

  const setPresentsStatus = async (
    orderId: number,
    status: boolean
  ): Promise<void> => {
    try {
      setIsPresentsStatusLoading(true);
      setIsPresentsStatusActiveLocal(status);
      const result = await dispatch(setOrderPresentsStatus(orderId, status));
      if (result.error) throw result.error;
      if (result.data?.code !== 0) throw new Error();
      setIsPresentsStatusActive(status);
      setIsPresentsStatusLoading(false);
    } catch (err) {
      setIsPresentsStatusActiveLocal(!status);
      setIsPresentsStatusLoading(false);
      handleError(err);
    }
  };

  return {
    setPresentsStatus,
    setIsPresentsStatusActive,
    isPresentsStatusActive,
    isPresentsStatusActiveLocal,
    isPresentsStatusLoading,
  };
};
