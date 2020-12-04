import React from 'react';
import {View, ViewProps, StyleSheet, Platform} from 'react-native';

type ShadowViewProps = ViewProps;

const ShadowView: React.FC<ShadowViewProps> = ({
  style,
  children,
  ...restProps
}) => {
  const shadowOpacity = StyleSheet.flatten(style).shadowOpacity;

  return (
    <View
      style={[
        Platform.OS === 'android' && {elevation: (shadowOpacity ?? 0) * 10},
        style,
      ]}
      {...restProps}>
      {children}
    </View>
  );
};

export default ShadowView;
