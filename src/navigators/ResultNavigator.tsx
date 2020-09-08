import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';

import { GameStackParamList } from '../../App';
import { Results } from '../screens/Results/Results';
import { Answer } from '../types/result';

type ResultScreenRouteProp = RouteProp<GameStackParamList, 'Result'>;

export const ResultNavigator = () => {
  const { params: answers } = useRoute<ResultScreenRouteProp>();

  return <Results answers={answers as Answer[]} />;
};
