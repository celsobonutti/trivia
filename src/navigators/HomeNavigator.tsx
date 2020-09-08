import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { GameStackParamList } from '../../App';
import { Home } from '../screens/Home/Home';

type HomeScreenNavigationProp = StackNavigationProp<GameStackParamList, 'Home'>;

export const HomeNavigator = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <Home
      goToGame={(questions) => {
        navigation.navigate('Game', questions);
      }}
    />
  );
};
