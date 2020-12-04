import React from 'react';
import {ScrollView, ScrollViewProps, StyleSheet} from 'react-native';
import {withSafeArea} from 'react-native-safe-area';

import PageContainer from '../../../../components/common/PageContainer';

const SafeScrollView = withSafeArea(ScrollView, 'margin', 'all');

export type AuthContainerProps = ScrollViewProps;

const AuthContainer: React.FC = ({children}) => {
  return (
    <SafeScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled">
      <PageContainer style={styles.authContainer}>{children}</PageContainer>
    </SafeScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  authContainer: {
    justifyContent: 'space-evenly',
    width: '100%',
    alignSelf: 'center',
  },
});

export default AuthContainer;
