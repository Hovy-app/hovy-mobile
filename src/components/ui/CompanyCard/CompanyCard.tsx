import React from 'react';
import {View, ViewProps, Image, StyleSheet} from 'react-native';

import {useTheme} from '../../../modules/Theme/hooks/useTheme';
import Text from '../Text';

export type CompanyCardProps = ViewProps & {
  title: string;
  address: string;
  pictureUrl: string;
};

const IMG_SIZE = 100;

const CompanyCard: React.FC<CompanyCardProps> = ({
  title,
  address,
  pictureUrl,
  style,
  ...restProps
}) => {
  const {theme} = useTheme();

  return (
    <View style={[styles.container, style]} {...restProps}>
      <View
        style={[
          styles.imageContainer,
          {
            marginBottom: theme.layout.s4,
          },
        ]}>
        <Image
          source={{
            uri: pictureUrl,
          }}
          width={IMG_SIZE}
          height={IMG_SIZE}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          style={{height: IMG_SIZE, width: IMG_SIZE}}
        />
      </View>
      <Text
        style={{
          fontFamily: theme.fonts.families.primary.semibold,
          marginBottom: theme.layout.s1,
        }}>
        {title}
      </Text>
      <Text type="description">{address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    shadowColor: `#000000`,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default CompanyCard;
