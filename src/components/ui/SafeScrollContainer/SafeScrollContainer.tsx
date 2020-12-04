import React from 'react';
import {ScrollView, StyleSheet, ScrollViewProps} from 'react-native';

import SafeContainer, {SafeContainerProps} from '../SafeContainer';

export type SafeScrollContainerProps = ScrollViewProps & SafeContainerProps;

const SafeScrollContainer: React.FC<SafeScrollContainerProps> = ({
  children,
  isCentered,
  isFlex,
  style,
  contentContainerStyle,
  forceInset,
  ...restProps
}) => {
  return (
    <SafeContainer forceInset={forceInset} isFlex={isFlex}>
      <ScrollView
        style={style}
        contentContainerStyle={[
          isCentered && styles.centeredContainer,
          contentContainerStyle,
        ]}
        keyboardShouldPersistTaps="handled"
        {...restProps}>
        {children}
      </ScrollView>
    </SafeContainer>
  );
};

SafeScrollContainer.defaultProps = {
  isCentered: false,
  isFlex: false,
};

const styles = StyleSheet.create({
  centeredContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});

export default SafeScrollContainer;
