import React from 'react';
import {
  View,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {useTheme} from '../../../modules/Theme/hooks/useTheme';

import Text from '../Text';

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  iconLeft?: JSX.Element;
  isLoading?: boolean;
  titleStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  titleStyle,
  iconLeft,
  isLoading,
  disabled,
  onPress,
  style,
  ...restProps
}) => {
  const {theme} = useTheme();

  const handlePress = (e: GestureResponderEvent): void => {
    if (!onPress) return;
    ReactNativeHapticFeedback.trigger('contextClick');
    onPress(e);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={disabled || isLoading}
      onPress={handlePress}
      {...restProps}>
      <View
        style={[
          styles.button,
          styles.buttonDefault,
          {
            backgroundColor: disabled
              ? theme.colors.uiDisabled
              : theme.colors.uiPrimary,
            borderRadius: theme.radii.sm,
            paddingVertical: theme.layout.s4,
          },
          style,
        ]}>
        {isLoading ? (
          <ActivityIndicator size="small" color={theme.colors.textInverse} />
        ) : (
          <>
            {iconLeft && (
              <View style={[styles.buttonIcon, {left: theme.layout.s4}]}>
                {iconLeft}
              </View>
            )}
            <Text
              style={[
                {
                  color: theme.colors.textInverse,
                  fontFamily: theme.fonts.families.primary.semibold,
                },
                titleStyle,
              ]}>
              {title}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDefault: {
    width: '100%',
  },
  buttonIcon: {
    position: 'absolute',
  },
});

export default Button;
