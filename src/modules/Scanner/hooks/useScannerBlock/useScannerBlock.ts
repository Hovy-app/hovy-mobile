import {useState, useEffect} from 'react';
import {BarCodeReadEvent} from 'react-native-camera';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import ScreenOrientation from 'react-native-orientation-locker';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {useScannerNavigation} from '../useScannerNavigation';
import {useScanner} from '../useScanner/useScanner';

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
  handleScan: (e: BarCodeReadEvent) => void;
};

export const useScannerBlock = (): UseScannerBlockType => {
  const {isScanned, isError, onScan} = useScanner();
  useKeepAwake();
  const {navigation} = useScannerNavigation();

  const [canShowCamera, setCanShowCamera] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setCanShowCamera(true);
    }, 500);
  }, []);

  useEffect(() => {
    ScreenOrientation.lockToPortrait();

    return () => {
      ScreenOrientation.unlockAllOrientations();
    };
  });

  const handleScan = (e: BarCodeReadEvent): void => {
    try {
      if (isScanned) return;
      const userId = onScan(e);
      ReactNativeHapticFeedback.trigger('notificationSuccess');
      navigation.replace('SearchResults', {filters: {userId}});
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
