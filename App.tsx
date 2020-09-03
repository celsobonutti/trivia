import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-paper';

import { darkTheme } from './src/utils/theme';
import { Home } from './src/screens/Home';
import { Game } from './src/screens/Game';
import { Question } from './src/types/questions';
import { ErrorBoundary } from './src/components/containers/ErrorBoundary';

export type GameStackParamList = {
  Home: undefined;
  Game: Question[];
};

const Stack = createStackNavigator<GameStackParamList>();

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <ErrorBoundary>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Game" component={Game} />
          </Stack.Navigator>
        </NavigationContainer>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
