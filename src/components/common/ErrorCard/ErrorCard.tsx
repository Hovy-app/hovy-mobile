import React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {useTheme} from '../../../modules/Theme/hooks/useTheme';

import Text from '../../ui/Text';

export type NoDataCardProps = ViewProps & {
  type: 'default' | 'no-data';
};

const ErrorCard: React.FC<NoDataCardProps> = ({type, style, ...restProps}) => {
  const {theme} = useTheme();

  return (
    <View style={[styles.container, style]} {...restProps}>
      <Icon
        name={type === 'no-data' ? 'list' : 'frown'}
        size={52}
        color={type === 'no-data' ? theme.colors.secondary : theme.colors.error}
        style={{marginBottom: theme.layout.sm}}
      />
      <Text type="description" colorType="light" style={styles.title}>
        {type === 'no-data' ? 'Данных не найдено.' : 'Ошибка!'}
      </Text>
    </View>
  );
};

ErrorCard.defaultProps = {
  type: 'default',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
});

export default ErrorCard;
