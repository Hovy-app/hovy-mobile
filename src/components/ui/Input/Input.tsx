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
            backgroundColor: theme.colors.secondaryBorder,
            paddingHorizontal: theme.layout.md,
            borderRadius: theme.radii.md,
            borderWidth: theme.border.md,
            color: theme.colors.primaryText,
            fontFamily: theme.fonts.families.regular,
            fontSize: theme.fonts.sizes.md,
          },
          error ? {borderColor: theme.colors.error} : null,
          style,
        ]}
        placeholderTextColor={theme.colors.secondaryText}
        {...restProps}
      />
      {error ? (
        <Text
          style={{
            marginLeft: theme.layout.md + 2,
            marginTop: theme.layout.xs,
          }}
          type="description"
          colorType="error">
          {error}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
  },
  input: {
    height: 45,
    borderColor: `transparent`,
  },
});

export default Input;
