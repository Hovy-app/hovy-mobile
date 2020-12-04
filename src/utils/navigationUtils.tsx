import React from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {
  Header,
  StackHeaderProps,
  StackNavigationOptions,
} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import ShadowView from '../components/ui/ShadowView';
import {ThemeType} from './theme';

import LogoSvg from '../assets/images/Logo.svg';
import CloseIconSvg from '../assets/images/icons/close.svg';
import BackIconSvg from '../assets/images/icons/back.svg';

export type GenerateCommonHeaderOptionsType = {
  shadowOpacity: number;
  transparent?: boolean;
  closeIconShown?: boolean;
  onCloseIconPress?: () => void;
  logoShown?: boolean;
  isSecondaryBg?: boolean;
};

export const generateCommonHeader = (
  theme: ThemeType,
  options?: GenerateCommonHeaderOptionsType
): StackNavigationOptions => {
  const styles = StyleSheet.create({
    shadowContainer: {
      shadowColor: `#000000`,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: options?.shadowOpacity ?? 0,
      shadowRadius: 15,
    },
    header: {
      borderBottomWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
    },
    backButton: {
      marginLeft: Platform.OS === 'ios' ? 2 : -8,
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    logo: {
      marginBottom: -2,
    },
  });

  const headerOptions: StackNavigationOptions = {
    header(props: StackHeaderProps) {
      return (
        <ShadowView style={styles.shadowContainer}>
          <Header {...props} />
        </ShadowView>
      );
    },
    headerStyle: [
      styles.header,
      {
        backgroundColor: options?.transparent
          ? `transparent`
          : options?.isSecondaryBg
          ? theme.colors.bgSecondary
          : theme.colors.bgPrimary,
      },
    ],
    headerTitle() {
      return options?.logoShown ? (
        <LogoSvg
          height={22}
          width={54}
          fill={theme.colors.textPrimary}
          style={styles.logo}
        />
      ) : null;
    },
    headerRight() {
      if (options?.closeIconShown)
        return (
          <TouchableOpacity
            onPress={options.onCloseIconPress}
            style={{
              paddingHorizontal: theme.layout.s3,
              paddingVertical: theme.layout.s1,
            }}>
            <CloseIconSvg
              height={theme.fonts.sizes.s3}
              width={theme.fonts.sizes.s3}
              fill={theme.colors.textPrimary}
            />
          </TouchableOpacity>
        );
      return null;
    },
    headerTitleAlign: 'center',
    headerLeftContainerStyle: {marginLeft: theme.layout.s4},
    headerRightContainerStyle: {marginRight: theme.layout.s5 - theme.layout.s3},
    headerBackImage() {
      return (
        <View
          style={[
            styles.backButton,
            {
              paddingHorizontal: theme.layout.s3,
              paddingVertical: theme.layout.s1,
            },
          ]}>
          <BackIconSvg
            height={theme.fonts.sizes.s3}
            width={theme.fonts.sizes.s3}
            fill={theme.colors.textPrimary}
          />
        </View>
      );
    },
    headerBackTitle: ' ',
    headerTransparent: options?.transparent,
  };

  return headerOptions;
};

export type GenerateStackScreenOptionsType = {
  headerShown?: boolean;
  isSecondaryBg?: boolean;
};

export const generateStackScreenOptions = (
  theme: ThemeType,
  options?: GenerateStackScreenOptionsType
): StackNavigationOptions => {
  const stackScreenOptions: StackNavigationOptions = {
    cardStyle: {
      backgroundColor: options?.isSecondaryBg
        ? theme.colors.bgSecondary
        : theme.colors.bgPrimary,
    },
    headerShown: options?.headerShown ?? false,
  };

  return stackScreenOptions;
};
