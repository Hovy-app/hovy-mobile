import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';

import {useTheme} from '../../../../modules/Theme/hooks/useTheme';
import MenuButton from '../../../../components/common/MenuButton';

import LogoSvg from '../../../../assets/images/Logo.svg';

const ScannerFooter: React.FC = () => {
  const {theme} = useTheme();

  return (
    <SafeAreaView style={{backgroundColor: theme.colors.constBlack}}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.constBlack,
            paddingVertical: theme.layout.s5 + theme.layout.s2,
          },
        ]}>
        <View style={styles.logoContainer}>
          <LogoSvg
            height={18}
            width={'100%'}
            fill={theme.colors.constWhite}
            style={{
              marginBottom: theme.layout.s2 - 2,
              marginTop: theme.layout.s2,
            }}
          />
        </View>
        <MenuButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
  },
});

export default ScannerFooter;
