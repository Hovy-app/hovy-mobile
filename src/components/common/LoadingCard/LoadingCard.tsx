import React from 'react';
import {View, ActivityIndicator, StyleSheet, ViewProps} from 'react-native';

import {useTheme} from '../../../modules/Theme/hooks/useTheme';

export type LoadingCardProps = ViewProps;

const LoadingCard: React.FC<LoadingCardProps> = ({style, ...restProps}) => {
  const {theme} = useTheme();

  return (
    <View style={[styles.container, style]} {...restProps}>
      <ActivityIndicator size="large" color={theme.colors.secondaryText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingCard;
