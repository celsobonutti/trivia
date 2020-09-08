import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-paper';

import { darkTheme } from './src/utils/theme';
import { HomeNavigator } from './src/navigators/HomeNavigator';
import { GameNavigator } from './src/navigators/GameNavigator';
import { Question } from './src/types/questions';
import { ErrorBoundary } from './src/components/containers/ErrorBoundary';
import { Answer } from './src/types/result';
import { ResultNavigator } from './src/navigators/ResultNavigator';
import { TriviaProvider } from './src/providers/TriviaProvider';

export type GameStackParamList = {
  Home: undefined;
  Game: Question[];
  Result: Answer[];
};

const Stack = createStackNavigator<GameStackParamList>();

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <StatusBar barStyle="dark-content" />
      <ErrorBoundary>
        <TriviaProvider>
          <NavigationContainer>
            <Stack.Navigator headerMode="none">
              <Stack.Screen name="Home" component={HomeNavigator} />
              <Stack.Screen name="Game" component={GameNavigator} />
              <Stack.Screen name="Result" component={ResultNavigator} />
            </Stack.Navigator>
          </NavigationContainer>
        </TriviaProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
