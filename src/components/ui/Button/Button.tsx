import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
  GestureResponderEvent,
  Pressable,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {useTheme} from '../../../modules/Theme/hooks/useTheme';

import Text from '../Text';
import ShadowView from '../ShadowView';

export interface ButtonProps extends TouchableOpacityProps {
  title?: string;
  iconRight?: string;
  type?: 'default' | 'clear';
  isLoading?: boolean;
  titleStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  titleStyle,
  iconRight,
  type,
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
    <Pressable
      style={({pressed}) => ({
        opacity: Platform.OS === 'ios' && pressed ? 0.7 : 1,
      })}
      disabled={disabled || isLoading}
      onPress={handlePress}
      {...restProps}>
      <ShadowView
        style={[
          styles.button,
          ...(type === 'default'
            ? disabled
              ? [
                  styles.buttonDefault,
                  styles.buttonDefaultDisabled,
                  {
                    backgroundColor: theme.colors.primaryBorder,
                    borderRadius: theme.radii.md,
                  },
                ]
              : [
                  styles.buttonDefault,
                  {
                    backgroundColor: theme.colors.primary,
                    shadowColor: theme.colors.primary,
                    borderRadius: theme.radii.md,
                  },
                ]
            : [
                styles.buttonClear,
                {
                  paddingVertical: theme.layout.xs,
                  paddingHorizontal: theme.layout.sm,
                },
              ]),
          style,
        ]}>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={
              type === 'default' ? theme.colors.white : theme.colors.primary
            }
          />
        ) : (
          <>
            <Text
              style={[
                {color: theme.colors.white},
                ...(type === 'clear'
                  ? disabled
                    ? [{color: theme.colors.secondaryText}]
                    : [{color: theme.colors.primary}]
                  : [null]),
                titleStyle,
              ]}
              type={type === 'clear' ? 'description' : 'primary'}>
              {title}
            </Text>
            {iconRight && (
              <Icon
                name={iconRight}
                color={
                  type === 'default'
                    ? theme.colors.white
                    : disabled
                    ? theme.colors.secondaryText
                    : theme.colors.primary
                }
                size={
                  type === 'default'
                    ? theme.fonts.sizes.lg
                    : theme.fonts.sizes.md
                }
                style={{marginLeft: theme.layout.sm}}
              />
            )}
          </>
        )}
      </ShadowView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDefault: {
    width: 200,
    height: 45,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonDefaultDisabled: {
    shadowOpacity: 0,
  },
  buttonClear: {
    backgroundColor: `transparent`,
  },
});

Button.defaultProps = {
  type: 'default',
};

export default Button;
