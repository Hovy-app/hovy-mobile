import {useState} from 'react';
import {BarCodeReadEvent} from 'react-native-camera';

export type QRDataType = {
  placeId: string;
};

export const isValidQR = (data: unknown): data is QRDataType => {
  if ((data as QRDataType).placeId) return true;
  return false;
};

export type UseScannerType = {
  isScanned: boolean;
  isError: boolean;
  onScan: (e: BarCodeReadEvent) => string;
};

export const useScanner = (): UseScannerType => {
  const [isScanned, setIsScanned] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const onScan = (e: BarCodeReadEvent): string => {
    try {
      const data = JSON.parse(e.data);
      if (!isValidQR(data)) throw new Error();
      setIsError(false);
      setIsScanned(true);
      return data.placeId;
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
