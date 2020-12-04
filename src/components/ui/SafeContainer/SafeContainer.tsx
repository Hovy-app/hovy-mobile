import React from 'react';
import {
  SafeAreaView as SafeAreaViewRN,
  StyleSheet,
  ViewProps,
} from 'react-native';
import SafeAreaView, {ForceInsetProp} from 'react-native-safe-area-view';

export type SafeContainerProps = ViewProps & {
  forceInset?: ForceInsetProp;
  isCentered?: boolean;
  isFlex?: boolean;
};

const SafeContainer: React.FC<SafeContainerProps> = ({
  children,
  isCentered,
  isFlex,
  style,
  forceInset,
  ...restProps
}) => {
  if (forceInset)
    return (
      <SafeAreaView
        style={[
          isFlex && styles.safeContainer,
          isCentered && styles.centeredContent,
          style,
        ]}
        {...restProps}>
        {children}
      </SafeAreaView>
    );

  return (
    <SafeAreaViewRN
      style={[
        isFlex && styles.safeContainer,
        isCentered && styles.centeredContent,
        style,
      ]}
      {...restProps}>
      {children}
    </SafeAreaViewRN>
  );
};

SafeContainer.defaultProps = {
  isCentered: false,
  isFlex: false,
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
  },
  centeredContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default SafeContainer;
