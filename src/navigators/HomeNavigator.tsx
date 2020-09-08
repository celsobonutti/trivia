import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { GameStackParamList } from '../../App';
import { Home } from '../screens/Home/Home';
import { useTriviaContext } from '../providers/TriviaProvider';

type HomeScreenNavigationProp = StackNavigationProp<GameStackParamList, 'Home'>;

export const HomeNavigator = () => {
  const { dispatch } = useTriviaContext();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <Home
      goToGame={(questions) => {
        navigation.navigate('Game', questions);
      }}
      onSelectGameOptions={({ category, difficulty }) => {
        dispatch({ type: 'select', category, difficulty });
      }}
    />
  );
};
