import {useState, useEffect} from 'react';
import {BarCodeReadEvent} from 'react-native-camera';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import ScreenOrientation from 'react-native-orientation-locker';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {useScannerNavigation} from '../useScannerNavigation';
import {useScanner} from '../useScanner/useScanner';
import {useDispatchRequest} from '@redux-requests/react';
import {setQrPlaceId} from '../../reducer/scannerReducer';
import {setShopData} from '../../../Auth/reducer/authReducer';

export type UserQRDataType = {
  userId: number;
};

export const isValidUserQR = (data: unknown): data is UserQRDataType => {
  if ((data as UserQRDataType).userId) return true;
  return false;
};

export type UseScannerBlockType = {
  isScanned: boolean;
  isError: boolean;
  canShowCamera: boolean;
  handleScan: (e: BarCodeReadEvent) => Promise<void>;
};

export const useScannerBlock = (): UseScannerBlockType => {
  const {isScanned, isError, onScan} = useScanner();
  useKeepAwake();
  const {navigation} = useScannerNavigation();
  const dispatch = useDispatchRequest();

  const [canShowCamera, setCanShowCamera] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setShopData(null));
    setTimeout(() => {
      setCanShowCamera(true);
    }, 500);
  }, [dispatch]);

  useEffect(() => {
    ScreenOrientation.lockToPortrait();

    return () => {
      ScreenOrientation.unlockAllOrientations();
    };
  });

  const handleScan = async (e: BarCodeReadEvent): Promise<void> => {
    try {
      if (isScanned) return;
      const qrPlaceId = onScan(e);
      await dispatch(setQrPlaceId(qrPlaceId));
      ReactNativeHapticFeedback.trigger('notificationSuccess');
      navigation.replace('Auth');
    } catch {
      if (!isError) ReactNativeHapticFeedback.trigger('notificationError');
    }
  };

  return {
    isScanned,
    isError,
    canShowCamera,
    handleScan,
  };
};
