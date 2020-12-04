import React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';

import {useTheme} from '../../../../modules/Theme/hooks/useTheme';

export type AuthFormContainerProps = ViewProps;

const AuthFormContainer: React.FC<AuthFormContainerProps> = ({
  children,
  style,
  ...restProps
}) => {
  const {theme} = useTheme();

  return (
    <View
      style={[
        styles.authFormContainer,
        {paddingVertical: theme.layout.md},
        style,
      ]}
      {...restProps}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  authFormContainer: {
    width: '100%',
    alignItems: 'center',
  },
});

export default AuthFormContainer;
