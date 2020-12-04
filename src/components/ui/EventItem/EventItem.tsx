import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {useTheme} from '../../../modules/Theme/hooks/useTheme';

import Text from '../Text';
import ShadowView from '../ShadowView';

interface EventItemProps extends TouchableOpacityProps {
  title?: string;
  isActive?: boolean;
  isHighlighted?: boolean;
}

const EventItem: React.FC<EventItemProps> = ({
  title,
  isActive,
  isHighlighted,
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
      style={[
        styles.container,
        {
          backgroundColor:
            isActive || isHighlighted ? theme.colors.secondary : `transparent`,
          borderColor:
            isActive || isHighlighted
              ? theme.colors.secondary
              : theme.colors.primaryBorder,
          paddingHorizontal: theme.layout.md,
          paddingVertical: theme.layout.sm,
          marginHorizontal: theme.layout.md,
          borderRadius: theme.radii.md,
        },
        style,
      ]}
      activeOpacity={0.75}
      onPress={handlePress}
      {...restProps}>
      <Text
        type="description"
        style={{color: theme.colors.primaryText}}
        numberOfLines={2}>
        {title}
      </Text>
      {isActive && (
        <ShadowView
          style={[
            styles.iconContainer,
            {
              borderRadius: theme.radii.md,
              backgroundColor: theme.colors.primary,
              shadowColor: theme.colors.primary,
            },
          ]}>
          <Icon
            name="check"
            size={theme.fonts.sizes.lg}
            color={theme.colors.white}
          />
        </ShadowView>
      )}
    </TouchableOpacity>
  );
};

EventItem.defaultProps = {
  isActive: false,
  isHighlighted: false,
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: -15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default EventItem;
