import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {useTheme} from '../modules/Theme/hooks/useTheme';

import {LoadingScreen} from '../modules/App/screens';
import {ScannerScreen} from '../modules/Scanner/screens';
import {
  AuthScreen,
  AuthMobileScreen,
  AuthMobileCodeScreen,
} from '../modules/Auth/screens';
import {QueueScreen} from '../modules/Queue/screens';
import {
  FeedbackAfterFirstScreen,
  FeedbackAfterSecondScreen,
} from '../modules/Feedback/screens';

import {
  generateCommonHeader,
  generateStackScreenOptions,
} from '../utils/navigationUtils';
import {useScroller} from '../modules/Scroller/hooks/useScroller';

const MainStack = createStackNavigator();

const Router: React.FC = () => {
  const {theme} = useTheme();
  const {opacity} = useScroller();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openScannerScreenGenerator = (navigation: any): (() => void) => {
    return () => navigation.replace('Scanner', {});
  };

  return (
    <MainStack.Navigator initialRouteName="Loading">
      <MainStack.Screen
        name="Loading"
        component={LoadingScreen}
        options={generateStackScreenOptions(theme)}
      />
      <MainStack.Screen
        name="Scanner"
        component={ScannerScreen}
        options={({navigation}) => ({
          ...generateStackScreenOptions(theme, {headerShown: false}),
          ...generateCommonHeader(theme, {
            shadowOpacity: opacity ?? 0,
            transparent: true,
          }),
        })}
      />
      <MainStack.Screen
        name="Auth"
        component={AuthScreen}
        options={({navigation}) => ({
          ...generateStackScreenOptions(theme, {
            headerShown: true,
          }),
          ...generateCommonHeader(theme, {
            shadowOpacity: opacity ?? 0,
            logoShown: true,
            closeIconShown: true,
            onCloseIconPress: openScannerScreenGenerator(navigation),
          }),
        })}
      />
      <MainStack.Screen
        name="AuthMobile"
        component={AuthMobileScreen}
        options={({navigation}) => ({
          ...generateStackScreenOptions(theme, {
            headerShown: true,
          }),
          ...generateCommonHeader(theme, {
            shadowOpacity: opacity ?? 0,
            logoShown: true,
            onCloseIconPress: openScannerScreenGenerator(navigation),
          }),
        })}
      />
      <MainStack.Screen
        name="AuthMobileCode"
        component={AuthMobileCodeScreen}
        options={({navigation}) => ({
          ...generateStackScreenOptions(theme, {
            headerShown: true,
          }),
          ...generateCommonHeader(theme, {
            shadowOpacity: opacity ?? 0,
            logoShown: true,
            onCloseIconPress: openScannerScreenGenerator(navigation),
          }),
        })}
      />
      <MainStack.Screen
        name="Queue"
        component={QueueScreen}
        options={({navigation}) => ({
          ...generateStackScreenOptions(theme, {
            headerShown: true,
          }),
          ...generateCommonHeader(theme, {
            shadowOpacity: opacity ?? 0,
            logoShown: true,
            onCloseIconPress: openScannerScreenGenerator(navigation),
          }),
        })}
      />
      <MainStack.Screen
        name="FeedbackAfterFirst"
        component={FeedbackAfterFirstScreen}
        options={({navigation}) => ({
          ...generateStackScreenOptions(theme, {
            headerShown: true,
          }),
          ...generateCommonHeader(theme, {
            shadowOpacity: opacity ?? 0,
            logoShown: true,
            onCloseIconPress: openScannerScreenGenerator(navigation),
          }),
        })}
      />
      <MainStack.Screen
        name="FeedbackAfterSecond"
        component={FeedbackAfterSecondScreen}
        options={({navigation}) => ({
          ...generateStackScreenOptions(theme, {
            headerShown: true,
          }),
          ...generateCommonHeader(theme, {
            shadowOpacity: opacity ?? 0,
            logoShown: true,
            onCloseIconPress: openScannerScreenGenerator(navigation),
          }),
        })}
      />
    </MainStack.Navigator>
  );
};

export default Router;
