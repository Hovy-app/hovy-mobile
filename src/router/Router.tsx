import React from 'react';
import {useNavigation, CompositeNavigationProp} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

import {useTheme} from '../modules/Theme/hooks/useTheme';
import {useAuth} from '../modules/Auth/hooks/useAuth';
import {useEvents} from '../modules/Events/hooks/useEvents';

import {LoadingScreen} from '../modules/Init/screens';
import {LoginScreen} from '../modules/Auth/screens';
import {ChooseEventsScreen} from '../modules/Events/screens';
import {HomeScreen} from '../modules/Home/screens';
import {SearchScreen, SearchResultsScreen} from '../modules/Search/screens';
import {UsersScreen} from '../modules/Users/screens';
import {OrderScreen} from '../modules/Orders/screens';
import {ScannerScreen} from '../modules/Scanner/screens';

import {
  generateCommonHeader,
  generateHeaderWithUser,
  renderShadowTabBar,
  generateTabBarOptions,
  generateStackScreenOptions,
  generateTabScreenOptions,
  generateCommonTabHeader,
} from '../utils/navigationUtils';
import {useScroller} from '../modules/Scroller/hooks/useScroller';

export type HomeStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<{HomeTab: {}}, 'HomeTab'>,
  StackNavigationProp<{Login: {}}>
>;

const HomeStack = createStackNavigator();

const HomeStackScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<HomeStackNavigationProp>();
  const {userData, logout} = useAuth();
  const {clearEvents} = useEvents();
  const {opacity} = useScroller();

  const onLogout = async (): Promise<void> => {
    ReactNativeHapticFeedback.trigger('contextClick');
    await logout();
    await clearEvents();
    navigation.replace('Login', {});
  };

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          ...generateStackScreenOptions(theme, true),
          ...generateCommonHeader(theme, '', {shadowOpacity: opacity ?? 0}),
          ...generateHeaderWithUser(theme, userData, onLogout),
        }}
      />
    </HomeStack.Navigator>
  );
};

const SearchStack = createStackNavigator();

const SearchStackScreen: React.FC = () => {
  const {theme} = useTheme();
  const {opacity} = useScroller();

  return (
    <SearchStack.Navigator>
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          ...generateStackScreenOptions(theme, true),
          ...generateCommonHeader(theme, '', {shadowOpacity: opacity ?? 0}),
          ...generateCommonTabHeader(theme, 'Поиск', 'search'),
        }}
      />
    </SearchStack.Navigator>
  );
};

const UsersStack = createStackNavigator();

const UsersStackScreen: React.FC = () => {
  const {theme} = useTheme();
  const {opacity} = useScroller();

  return (
    <UsersStack.Navigator>
      <UsersStack.Screen
        name="Users"
        component={UsersScreen}
        options={{
          ...generateStackScreenOptions(theme, true),
          ...generateCommonHeader(theme, '', {shadowOpacity: opacity ?? 0}),
          ...generateCommonTabHeader(theme, 'Участники', 'users'),
        }}
      />
    </UsersStack.Navigator>
  );
};

const MainTabs = createBottomTabNavigator();

const MainTabsScreen: React.FC = () => {
  const {theme} = useTheme();

  return (
    <MainTabs.Navigator
      tabBar={renderShadowTabBar}
      tabBarOptions={generateTabBarOptions(theme)}
      lazy={false}>
      <MainTabs.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={generateTabScreenOptions(theme, 'Главная', 'home')}
      />
      <MainTabs.Screen
        name="SearchTab"
        component={SearchStackScreen}
        options={generateTabScreenOptions(theme, 'Поиск', 'search')}
      />
      <MainTabs.Screen
        name="UsersTab"
        component={UsersStackScreen}
        options={{
          ...generateTabScreenOptions(theme, 'Участники', 'users'),
          unmountOnBlur: true,
        }}
      />
    </MainTabs.Navigator>
  );
};

const MainStack = createStackNavigator();

const Router: React.FC = () => {
  const {theme} = useTheme();
  const {opacity} = useScroller();

  return (
    <MainStack.Navigator initialRouteName="Loading">
      <MainStack.Screen
        name="Loading"
        component={LoadingScreen}
        options={generateStackScreenOptions(theme)}
      />
      <MainStack.Screen
        name="Login"
        component={LoginScreen}
        options={generateStackScreenOptions(theme)}
      />
      <MainStack.Screen
        name="ChooseEvents"
        component={ChooseEventsScreen}
        options={generateStackScreenOptions(theme)}
      />
      <MainStack.Screen
        name="MainTabs"
        component={MainTabsScreen}
        options={generateStackScreenOptions(theme)}
      />
      <MainStack.Screen
        name="SearchResults"
        component={SearchResultsScreen}
        options={{
          ...generateStackScreenOptions(theme, true),
          ...generateCommonHeader(theme, 'Результаты поиска', {
            shadowOpacity: opacity ?? 0,
          }),
        }}
      />
      <MainStack.Screen
        name="Order"
        component={OrderScreen}
        options={{
          ...generateStackScreenOptions(theme, true),
          ...generateCommonHeader(theme, 'Детали заказа', {
            shadowOpacity: opacity ?? 0,
          }),
        }}
      />
      <MainStack.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          ...generateStackScreenOptions(theme, true),
          ...generateCommonHeader(theme, 'Сканнер', {
            shadowOpacity: opacity ?? 0,
            transparent: true,
          }),
        }}
      />
    </MainStack.Navigator>
  );
};

export default Router;
