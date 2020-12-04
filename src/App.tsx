import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Router from './router';
import store from './redux/store';
import {useErrorListener} from './modules/Error/hooks/useErrorListener';

import ScrollContextProvider from './modules/Scroller/context';
import ThemeContextProvider from './modules/Theme/context';
import AlertContainer from './modules/Alert/components/AlertContainer';

const App: React.FC = () => {
  useErrorListener();

  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <ScrollContextProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <StatusBar barStyle="dark-content" />
              <AlertContainer />
              <Router />
            </NavigationContainer>
          </SafeAreaProvider>
        </ScrollContextProvider>
      </ThemeContextProvider>
    </Provider>
  );
};

export default App;
