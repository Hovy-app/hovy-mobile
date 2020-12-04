import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ActivityIndicatorProps,
} from 'react-native';

import {useTheme} from '../../../modules/Theme/hooks/useTheme';

import Text from '../../ui/Text';

export type ListFooterLoader = ActivityIndicatorProps & {
  isLoading?: boolean;
  isEnd?: boolean;
};

const ListFooterLoader: React.FC<ListFooterLoader> = ({
  isLoading,
  isEnd,
  ...restProps
}) => {
  const {theme} = useTheme();

  if (!isLoading && !isEnd) return null;
  if (isEnd)
    return (
      <View style={[style.container, {paddingVertical: theme.layout.md}]}>
        <Text type="description" colorType="light">
          Конец 😊
        </Text>
      </View>
    );
  return (
    <View style={[style.container, {paddingVertical: theme.layout.md}]}>
      <ActivityIndicator
        animating={true}
        color={theme.colors.secondaryText}
        size="small"
        {...restProps}
      />
    </View>
  );
};

ListFooterLoader.defaultProps = {
  isLoading: false,
  isEnd: false,
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default ListFooterLoader;
