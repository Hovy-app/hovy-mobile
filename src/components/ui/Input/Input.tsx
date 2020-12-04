import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import {useTheme} from '../../../modules/Theme/hooks/useTheme';

import Text from '../Text';

export interface InputProps extends TextInputProps {
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const Input: React.FC<InputProps> = ({
  error,
  containerStyle,
  style,
  ...restProps
}) => {
  const {theme} = useTheme();

  return (
    <View style={[styles.inputContainer, containerStyle]}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.bgSecondary,
            paddingHorizontal: theme.layout.s4,
            paddingVertical: theme.layout.s4,
            borderRadius: theme.radii.sm,
            borderColor: theme.colors.uiBorder,
            color: theme.colors.textPrimary,
            fontFamily: theme.fonts.families.primary.semibold,
            fontSize: theme.fonts.sizes.s2,
          },
          style,
        ]}
        placeholderTextColor={theme.colors.textSecondary}
        {...restProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
  },
  input: {
    borderColor: `transparent`,
  },
});

export default Input;
