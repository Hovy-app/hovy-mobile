import React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';

import {useTheme} from '../../../../modules/Theme/hooks/useTheme';

export type ChooseEventsContainerProps = ViewProps;

const ChooseEventsContainer: React.FC<ChooseEventsContainerProps> = ({
  children,
  style,
  ...restProps
}) => {
  const {theme} = useTheme();

  return (
    <View
      style={[styles.container, {paddingVertical: theme.layout.md}, style]}
      {...restProps}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChooseEventsContainer;
