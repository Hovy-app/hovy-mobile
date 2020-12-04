import React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';

import {useTheme} from '../../../modules/Theme/hooks/useTheme';

import Text, {TextProps} from '../Text';
import Button, {ButtonProps} from '../Button';

export type InteractiveCardProps = ViewProps & {
  title?: string;
  titleProps?: TextProps;
  subtitle?: string;
  subtitleProps?: TextProps;
  buttonProps?: ButtonProps;
};

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  titleProps,
  subtitle,
  subtitleProps,
  buttonProps,
  style,
  ...restProps
}) => {
  const {theme} = useTheme();

  const {style: titleStyle, ...restTitleProps} = titleProps ?? {};
  const {style: subtitleStyle, ...restSubtitleProps} = subtitleProps ?? {};

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: theme.radii.md,
          backgroundColor: theme.colors.secondaryBorder,
          padding: theme.layout.lg,
        },
        style,
      ]}
      {...restProps}>
      {title && (
        <Text
          type="title"
          style={[
            subtitle ? {marginBottom: theme.layout.sm} : null,
            styles.commonText,
            titleStyle,
          ]}
          {...restTitleProps}>
          {title}
        </Text>
      )}
      {subtitle && (
        <Text
          type="description"
          colorType="light"
          style={[
            buttonProps && {marginBottom: theme.layout.lg},
            styles.commonText,
            subtitleStyle,
          ]}
          {...restSubtitleProps}>
          {subtitle}
        </Text>
      )}
      {buttonProps && <Button {...buttonProps} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  commonText: {
    textAlign: 'center',
  },
});

export default InteractiveCard;
