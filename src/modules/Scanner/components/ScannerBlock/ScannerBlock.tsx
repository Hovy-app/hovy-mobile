import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {BarcodeMask} from '@nartc/react-native-barcode-mask';

import {useTheme} from '../../../../modules/Theme/hooks/useTheme';

import Text from '../../../../components/ui/Text';
import SafeContainer from '../../../../components/ui/SafeContainer';
import PageContainer from '../../../../components/common/PageContainer';
import {useScannerBlock} from '../../hooks/useScannerBlock';

const ScannerBlock: React.FC = () => {
  const {theme} = useTheme();
  const {isError, canShowCamera, handleScan} = useScannerBlock();

  return (
    <View
      style={[styles.cameraPlaceholder, {backgroundColor: theme.colors.black}]}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.black}
      />
      {canShowCamera && (
        <RNCamera
          style={styles.camera}
          onBarCodeRead={handleScan}
          captureAudio={false}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}>
          <BarcodeMask
            width={300}
            height={300}
            edgeWidth={25}
            edgeHeight={25}
            edgeRadius={theme.radii.md}
            showAnimatedLine={false}
            backgroundColor="#000000"
            maskOpacity={0.7}
          />
          <SafeContainer style={[styles.container, {bottom: theme.layout.md}]}>
            <PageContainer>
              <View style={styles.textContainer}>
                <Text
                  style={[styles.text, !isError && {color: theme.colors.white}]}
                  colorType={isError ? 'error' : 'primary'}>
                  {isError
                    ? 'Ошибка сканирования или некорректный QR-код. Попробуйте еще раз.'
                    : 'Поднесите устройство к QR-коду пользователя.'}
                </Text>
              </View>
            </PageContainer>
          </SafeContainer>
        </RNCamera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  cameraPlaceholder: {
    flex: 1,
  },
});

export default ScannerBlock;
