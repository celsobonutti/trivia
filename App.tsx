import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "react-native-paper";

import { darkTheme } from "./src/utils/theme";
import { Home } from "./src/screens/Home";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
