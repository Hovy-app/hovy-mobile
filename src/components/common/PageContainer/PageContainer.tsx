import React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';

import {useTheme} from '../../../modules/Theme/hooks/useTheme';

export type PageContainerProps = ViewProps & {
  isCentered?: boolean;
};

const PageContainer: React.FC<PageContainerProps> = ({
  style,
  isCentered,
  children,
  ...restProps
}) => {
  const {theme} = useTheme();

  return (
    <View
      style={[
        styles.pageContainer,
        isCentered && styles.centeredContent,
        {paddingHorizontal: theme.layout.md},
        style,
      ]}
      {...restProps}>
      {children}
    </View>
  );
};

PageContainer.defaultProps = {
  isCentered: false,
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  centeredContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default PageContainer;
