import React from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  Platform,
  StyleSheet,
} from 'react-native';

export type KeyboardAvoidingContainerProps = KeyboardAvoidingViewProps & {};

const KeyboardAvoidingContainer: React.FC<KeyboardAvoidingContainerProps> = ({
  children,
  ...restProps
}) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS !== 'ios' ? 'height' : 'padding'}
      keyboardVerticalOffset={0}
      {...restProps}>
      {children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
});

export default KeyboardAvoidingContainer;
