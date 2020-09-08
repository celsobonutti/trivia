import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';

import { GameStackParamList } from '../../App';
import { Game } from '../screens/Game/Game';
import { Question } from '../types/questions';

type GameScreenRouteProp = RouteProp<GameStackParamList, 'Game'>;

export const GameNavigator = () => {
  const { params: questions } = useRoute<GameScreenRouteProp>();

  return <Game questions={questions as Question[]} />;
};
