import React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';
import {Switch, SwitchProps} from 'react-native-switch';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {useTheme} from '../../../modules/Theme/hooks/useTheme';

import ShadowView from '../ShadowView';
import Text from '../Text';

export type SwitchItemProps = ViewProps & {
  title?: string;
  isActive?: boolean;
  isDisabled?: boolean;
  onSwitch?: (val: boolean) => void;
  switchProps?: SwitchProps;
};

const SwithItem: React.FC<SwitchItemProps> = ({
  style,
  title,
  isActive,
  isDisabled,
  onSwitch,
  switchProps,
  ...restProps
}) => {
  const {theme} = useTheme();

  const {value, disabled, onValueChange, ...restSwitchProps} =
    switchProps ?? {};

  const handleSwitch = (val: boolean): void => {
    if (!onValueChange && !onSwitch) return;
    ReactNativeHapticFeedback.trigger('impactLight');
    if (onValueChange) onValueChange(val);
    else if (onSwitch) onSwitch(val);
  };

  const renderCustomSwitchCicrcle = (): JSX.Element => {
    return (
      <ShadowView
        style={[
          styles.customCircle,
          {
            backgroundColor: theme.colors.white,
            shadowColor: theme.colors.black,
          },
        ]}
      />
    );
  };

  return (
    <View style={[style, styles.container]} {...restProps}>
      <Text>{title ?? ''}</Text>
      <Switch
        value={value !== undefined ? value : isActive}
        disabled={disabled !== undefined ? disabled : isDisabled}
        onValueChange={handleSwitch}
        circleBorderWidth={0}
        renderActiveText={false}
        renderInActiveText={false}
        backgroundActive={theme.colors.primary}
        backgroundInactive={theme.colors.primaryBorder}
        circleActiveColor={theme.colors.white}
        circleInActiveColor={theme.colors.white}
        barHeight={30}
        circleSize={25}
        switchWidthMultiplier={2.2}
        renderInsideCircle={renderCustomSwitchCicrcle}
        {...restSwitchProps}
      />
    </View>
  );
};

SwithItem.defaultProps = {
  isActive: false,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  customCircle: {
    width: 25,
    height: 25,
    borderRadius: 30,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default SwithItem;
