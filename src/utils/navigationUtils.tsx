import React from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {
  Header,
  StackHeaderProps,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {
  BottomTabBar,
  BottomTabBarOptions,
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import Text from '../components/ui/Text';
import ShadowView from '../components/ui/ShadowView';
import {UserDataType} from '../modules/Auth/reducer';
import {ThemeType} from './theme';

type GenerateHeaderOptions = {
  shadowOpacity: number;
  transparent?: boolean;
};

export const generateCommonHeader = (
  theme: ThemeType,
  title = 'Title',
  options?: GenerateHeaderOptions
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
    headerLeftContainer: {
      marginLeft: 0,
    },
    headerRightContainer: {
      marginRight: 10,
    },
    backButton: {
      marginLeft: Platform.OS === 'ios' ? 2 : -8,
      paddingHorizontal: 10,
      paddingVertical: 5,
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
      {backgroundColor: options?.transparent ? `transparent` : theme.colors.bg},
    ],
    headerTitle() {
      return title ? (
        <Text
          style={{
            color: options?.transparent
              ? theme.colors.white
              : theme.colors.primaryText,
          }}>
          {title}
        </Text>
      ) : undefined;
    },
    headerTitleAlign: 'center',
    headerLeftContainerStyle: styles.headerLeftContainer,
    headerRightContainerStyle: styles.headerRightContainer,
    headerBackImage() {
      return (
        <View style={styles.backButton}>
          <Icon
            name="chevron-left"
            size={26}
            color={
              options?.transparent
                ? theme.colors.white
                : theme.colors.primaryText
            }
          />
        </View>
      );
    },
    headerBackTitle: ' ',
    headerTransparent: options?.transparent,
  };

  return headerOptions;
};

export const generateHeaderWithUser = (
  theme: ThemeType,
  userData: UserDataType | null,
  logout?: () => Promise<void>
): StackNavigationOptions => {
  const styles = StyleSheet.create({
    headerLeftInnerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
    },
    userCircle: {
      borderRadius: 20,
      marginRight: 10,
      height: '100%',
      maxHeight: 30,
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
  });

  const headerOptions: StackNavigationOptions = {
    headerTitle: '',
    headerLeft() {
      return (
        <View style={styles.headerLeftInnerContainer}>
          <View
            style={[
              styles.userCircle,
              {backgroundColor: theme.colors.secondaryBorder},
            ]}>
            <Icon name="user" size={16} color={theme.colors.primaryText} />
          </View>
          <Text>
            {userData
              ? `${userData.name[0].toUpperCase()}. ${userData.lastName}`
              : 'Manager'}
          </Text>
        </View>
      );
    },
    headerRight() {
      return (
        <TouchableOpacity style={styles.rightButton} onPress={logout}>
          <Icon name="log-out" size={20} color={theme.colors.primaryText} />
        </TouchableOpacity>
      );
    },
  };

  return headerOptions;
};

export const generateCommonTabHeader = (
  theme: ThemeType,
  title?: string,
  iconName?: string
): StackNavigationOptions => {
  const styles = StyleSheet.create({
    headerLeftInnerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 20,
    },
  });

  const headerOptions: StackNavigationOptions = {
    headerTitle: '',
    headerLeft() {
      return (
        <View style={styles.headerLeftInnerContainer}>
          {iconName && (
            <Icon
              name={iconName}
              size={20}
              color={theme.colors.primaryText}
              style={{marginRight: theme.layout.sm}}
            />
          )}
          {title && <Text>{title}</Text>}
        </View>
      );
    },
  };

  return headerOptions;
};

export const renderShadowTabBar = (props: BottomTabBarProps): JSX.Element => {
  const styles = StyleSheet.create({
    shadowContainer: {
      shadowColor: `#000000`,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.1,
      shadowRadius: 15,
    },
  });

  return (
    <ShadowView style={styles.shadowContainer}>
      <BottomTabBar {...props} />
    </ShadowView>
  );
};

export const generateTabBarOptions = (
  theme: ThemeType
): BottomTabBarOptions => {
  const styles = StyleSheet.create({
    tabBar: {
      ...(Platform.OS === 'android' ? {height: 55} : {}),
      paddingTop: 5,
      borderTopWidth: 0,
      elevation: 0,
      shadowOpacity: 0,
    },
    tabLabel: {
      marginBottom: Platform.OS !== 'ios' ? 7 : 2,
    },
  });

  const tabBarOptions = {
    style: [styles.tabBar, {backgroundColor: theme.colors.bg}],
    adaptive: Platform.OS !== 'ios' ? false : true,
    activeTintColor: theme.colors.primaryText,
    inactiveTintColor: theme.colors.secondaryText,
    labelStyle: [
      styles.tabLabel,
      {
        fontFamily: theme.fonts.families.regular,
        fontSize: theme.fonts.sizes.xs,
      },
    ],
  };

  return tabBarOptions;
};

export const generateStackScreenOptions = (
  theme: ThemeType,
  headerShown = false
): StackNavigationOptions => {
  const stackScreenOptions: StackNavigationOptions = {
    cardStyle: {backgroundColor: theme.colors.bg},
    headerShown,
  };

  return stackScreenOptions;
};

export const generateTabScreenOptions = (
  theme: ThemeType,
  title = 'Tab',
  iconName = 'home'
): BottomTabNavigationOptions => {
  const tabScreenOptions: BottomTabNavigationOptions = {
    title,
    tabBarIcon({focused, size}) {
      return (
        <Icon
          name={iconName}
          color={focused ? theme.colors.primary : theme.colors.secondaryText}
          size={size - 1}
        />
      );
    },
  };

  return tabScreenOptions;
};
