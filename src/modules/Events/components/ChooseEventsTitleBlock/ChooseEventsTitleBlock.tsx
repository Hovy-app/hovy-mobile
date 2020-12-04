import React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';

import {useTheme} from '../../../../modules/Theme/hooks/useTheme';

import Text from '../../../../components/ui/Text';

export type ChooseEventsTitleBlockProps = ViewProps;

const ChooseEventsTitleBlock: React.FC = () => {
  const {theme} = useTheme();

  return (
    <View style={[styles.container, {paddingBottom: theme.layout.md}]}>
      <Text
        type="title"
        style={[styles.title, {marginBottom: theme.layout.sm}]}>
        Выбор мероприятия
      </Text>
      <Text type="description" colorType="light" style={styles.subtitle}>
        Выберите необходимые мероприятия из списка, чтобы начать сканирование.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: 500,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
});

export default ChooseEventsTitleBlock;
