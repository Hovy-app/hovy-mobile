import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

import {useTheme} from '../../../modules/Theme/hooks/useTheme';

import HamburgerIconSvg from '../../../assets/images/icons/hamburger.svg';

const MenuButton: React.FC = () => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        styles.container,
        {
          right: theme.layout.s5 - theme.layout.s3,
          bottom: theme.layout.s5 - theme.layout.s3,
          backgroundColor: theme.colors.constBlack,
          padding: theme.layout.s4,
        },
      ]}>
      <HamburgerIconSvg
        height={theme.fonts.sizes.s3}
        width={theme.fonts.sizes.s3}
        fill={theme.colors.constWhite}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    borderRadius: 100,
  },
});

export default MenuButton;
