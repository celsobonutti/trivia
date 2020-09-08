import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { GameStackParamList } from '../../App';
import { Game } from '../screens/Game/Game';
import { Question } from '../types/questions';
import { StackNavigationProp } from '@react-navigation/stack';

type GameScreenRouteProp = RouteProp<GameStackParamList, 'Game'>;
type GameScreenNavigationProp = StackNavigationProp<GameStackParamList, 'Game'>;

export const GameNavigator = () => {
  const { params: questions } = useRoute<GameScreenRouteProp>();
  const navigation = useNavigation<GameScreenNavigationProp>();

  return (
    <Game
      questions={questions as Question[]}
      onSubmitAnswers={(answers) => {
        navigation.replace('Result', answers);
      }}
    />
  );
};
