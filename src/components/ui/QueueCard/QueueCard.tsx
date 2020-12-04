import React from 'react';
import {View, ViewProps, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useTheme} from '../../../modules/Theme/hooks/useTheme';
import Text from '../Text';

export type QueueCardProps = ViewProps & {
  type?: 'default' | 'attention' | 'process';
  label: string;
  title: string;
  address: string;
  pictureUrl: string;
  queueNumber: number | string;
};

const IMG_SIZE = 36;

const QueueCard: React.FC<QueueCardProps> = ({
  type,
  label,
  title,
  address,
  pictureUrl,
  queueNumber,
  style,
  ...restProps
}) => {
  const {theme} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            type === 'default'
              ? theme.colors.uiBlue
              : type === 'attention'
              ? theme.colors.uiGreen
              : theme.colors.uiGrey,
          borderRadius: theme.radii.sm,
        },
        style,
      ]}>
      <LinearGradient
        colors={[
          type === 'default'
            ? theme.colors.uiBlue
            : type === 'attention'
            ? theme.colors.uiGreen
            : theme.colors.uiGrey,
          type === 'default'
            ? theme.colors.uiLightBlue
            : type === 'attention'
            ? theme.colors.uiLightGreen
            : theme.colors.uiLightGrey,
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[
          styles.topContainer,
          {
            paddingVertical: theme.layout.s5,
            borderTopLeftRadius: theme.radii.sm,
            borderTopRightRadius: theme.radii.sm,
          },
        ]}>
        <Text
          style={{
            fontFamily: theme.fonts.families.primary.semibold,
            color: theme.colors.textInverse,
            fontSize: 18,
          }}>
          {label}
        </Text>
        <Text
          style={{
            fontFamily: theme.fonts.families.secondary.medium,
            fontSize: theme.fonts.sizes.s5,
            color: theme.colors.textInverse,
            marginTop: -theme.layout.s4,
          }}>
          {queueNumber}
        </Text>
      </LinearGradient>
      <View
        style={[styles.bottomContainer, {padding: theme.layout.s4}]}
        {...restProps}>
        <View style={{marginRight: theme.layout.s4}}>
          <Image
            source={{
              uri: pictureUrl,
            }}
            width={IMG_SIZE}
            height={IMG_SIZE}
            accessibilityIgnoresInvertColors
            resizeMode="cover"
            style={{
              height: IMG_SIZE,
              width: IMG_SIZE,
              borderRadius: theme.radii.sm,
            }}
          />
        </View>
        <View>
          <Text
            style={{
              fontFamily: theme.fonts.families.primary.semibold,
              marginBottom: theme.layout.s1,
              color: theme.colors.textInverse,
            }}>
            {title}
          </Text>
          <Text type="description" style={{color: theme.colors.textInverse}}>
            {address}
          </Text>
        </View>
      </View>
    </View>
  );
};

QueueCard.defaultProps = {
  type: 'default',
};

const styles = StyleSheet.create({
  container: {
    shadowColor: `#000000`,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  topContainer: {
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default QueueCard;
