import React from 'react';
import {Text as RNText, TextProps as RNTextProps} from 'react-native';

import {useTheme} from '../../../modules/Theme/hooks/useTheme';

export interface TextProps extends RNTextProps {
  type?: 'primary' | 'title' | 'subtitle' | 'description';
  colorType?: 'primary' | 'light' | 'error';
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
          fontFamily: theme.fonts.families.regular,
          fontSize: theme.fonts.sizes.md,
        },
        type === 'title' && {
          fontFamily: theme.fonts.families.semibold,
          fontSize: theme.fonts.sizes.xl,
        },
        type === 'subtitle' && {
          fontFamily: theme.fonts.families.semibold,
          fontSize: theme.fonts.sizes.lg,
        },
        type === 'description' && {
          fontFamily: theme.fonts.families.regular,
          fontSize: theme.fonts.sizes.sm,
        },
        colorType === 'primary' && {
          color: theme.colors.primaryText,
        },
        colorType === 'light' && {
          color: theme.colors.secondaryText,
        },
        colorType === 'error' && {
          color: theme.colors.error,
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
