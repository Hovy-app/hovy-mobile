import React from 'react';
import {Text as RNText, TextProps as RNTextProps} from 'react-native';

import {useTheme} from '../../../modules/Theme/hooks/useTheme';

export interface TextProps extends RNTextProps {
  type?: 'primary' | 'title' | 'description';
  colorType?: 'primary' | 'error';
}

const Text: React.FC<TextProps> = ({
  children,
  type,
  colorType,
  style,
  ...restProps
}) => {
  const {theme} = useTheme();

  return (
    <RNText
      style={[
        {
          fontFamily: theme.fonts.families.primary.regular,
          fontSize: theme.fonts.sizes.s2,
        },
        type === 'title' && {
          fontFamily: theme.fonts.families.primary.bold,
          fontSize: theme.fonts.sizes.s4,
        },
        type === 'description' && {
          fontFamily: theme.fonts.families.primary.regular,
          fontSize: theme.fonts.sizes.s1,
        },
        colorType === 'primary' && {
          color: theme.colors.textPrimary,
        },
        colorType === 'error' && {
          color: theme.colors.textError,
        },
        style,
      ]}
      {...restProps}>
      {children}
    </RNText>
  );
};

Text.defaultProps = {
  type: 'primary',
  colorType: 'primary',
};

export default Text;
