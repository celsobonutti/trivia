import React from 'react';
import { Text, View } from 'react-native'
import Button from '../components/Button';

export const Home = () => {
  return (
    <View>
      <Text>
        Welcome to Trivia!
      </Text>
      <Button onPress={() => {}}>
        Test
      </Button>
    </View>
  )
};
