import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';

import { GameStackParamList } from '../../App';
import { useTriviaContext } from '../providers/TriviaProvider';
import { Results } from '../screens/Results/Results';
import { Answer } from '../types/result';
import { fetchQuestions } from '../utils/fetchQuestions';

type ResultScreenRouteProp = RouteProp<GameStackParamList, 'Result'>;
type ResultScreenNavigationProp = StackNavigationProp<
  GameStackParamList,
  'Result'
>;

export const ResultNavigator = () => {
  const { params: answers } = useRoute<ResultScreenRouteProp>();
  const navigation = useNavigation<ResultScreenNavigationProp>();

  const { state } = useTriviaContext();

  return (
    <Results
      answers={answers as Answer[]}
      onGoToHome={() => {
        navigation.popToTop();
      }}
      onPlayAgain={async () => {
        const { category, difficulty } = state;
        fetchQuestions({
          category,
          difficulty
        }).then((questions) => {
          navigation.replace('Game', questions);
        });
      }}
    />
  );
};
