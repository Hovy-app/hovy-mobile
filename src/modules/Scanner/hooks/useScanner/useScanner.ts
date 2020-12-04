import {useState} from 'react';
import {BarCodeReadEvent} from 'react-native-camera';

export type UserQRDataType = {
  userId: number;
};

export const isValidUserQR = (data: unknown): data is UserQRDataType => {
  if ((data as UserQRDataType).userId) return true;
  return false;
};

export type UseScannerType = {
  isScanned: boolean;
  isError: boolean;
  onScan: (e: BarCodeReadEvent) => number;
};

export const useScanner = (): UseScannerType => {
  const [isScanned, setIsScanned] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const onScan = (e: BarCodeReadEvent): number => {
    try {
      const data = JSON.parse(e.data);
      if (!isValidUserQR(data)) throw new Error();
      setIsError(false);
      setIsScanned(true);
      return data.userId;
    } catch (err) {
      setIsError(true);
      throw err;
    }
  };

  return {
    isScanned,
    isError,
    onScan,
  };
};
