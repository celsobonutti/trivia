import React, { ComponentClass, FunctionComponent } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

type MockedNavigatorProps = {
  component: ComponentClass<any, any> | FunctionComponent<any>;
  params?: any;
};

export const MockedNavigator = ({
  component,
  params = {}
}: MockedNavigatorProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MockedScreen"
          component={component}
          initialParams={params}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
