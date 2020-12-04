import {useState, useEffect} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';

import {useAlert} from '../../../Alert/hooks/useAlert';

export const useErrorListener = (): void => {
  const {showAlert, hideAlert} = useAlert();
  const netInfo = useNetInfo();

  const [netConnected, setNetConnected] = useState(true);

  useEffect(() => {
    if (netInfo.type !== 'unknown') setNetConnected(netInfo.isConnected);
  }, [netInfo]);

  useEffect(() => {
    if (!netConnected)
      showAlert({
        message: 'Нет соединения с сетью.',
        type: 'danger',
        autoHide: false,
      });
    else hideAlert();
  }, [showAlert, hideAlert, netConnected]);
};
