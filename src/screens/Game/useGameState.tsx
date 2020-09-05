import React, { Reducer } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Animated, Dimensions } from 'react-native';
import { Map } from 'immutable';

import { GameStackParamList } from '../../../App';
import { GameAction, GameState, reducer } from './reducer';
import { Question } from '../../types/questions';

type GameScreenRouteProp = RouteProp<GameStackParamList, 'Game'>;

export const useGameState = () => {
  const { width } = Dimensions.get('screen');
  const { params } = useRoute<GameScreenRouteProp>();
  const labelOpacity = React.useRef(new Animated.Value(1)).current;
  const labelPositionOffset = React.useRef(new Animated.Value(0)).current;

  const [
    { questions, currentQuestionIndex, answers },
    dispatch
  ] = React.useReducer<Reducer<GameState, GameAction>>(reducer, {
    answers: Map(),
    currentQuestionIndex: 0,
    questions: params as Question[]
  });

  const setOpacity = (opacity: number) =>
    Animated.timing(labelOpacity, {
      duration: 150,
      toValue: opacity,
      useNativeDriver: true
    });

  const moveTo = (position: number) =>
    Animated.spring(labelPositionOffset, {
      toValue: position,
      tension: 80,
      useNativeDriver: true
    });

  const fadeIn = () => setOpacity(1);
  const fadeOut = () => setOpacity(0);
  const moveLeft = () => moveTo(-width / 2);
  const moveRight = () => moveTo(width / 2);
  const moveCenter = () => moveTo(0);

  const answerQuestion = (value: boolean) => {
    dispatch({ type: 'answer_question', value });
    if (currentQuestionIndex < questions.length - 1) {
      Animated.parallel([fadeOut(), moveLeft()]).start(() => {
        labelPositionOffset.setValue(width / 2);
        dispatch({ type: 'progress' });
        Animated.parallel([fadeIn(), moveCenter()]).start();
      });
    }
  };

  const goBack = () => {
    if (currentQuestionIndex > 0) {
      Animated.parallel([fadeOut(), moveRight()]).start(() => {
        labelPositionOffset.setValue(-width / 2);
        dispatch({ type: 'go_back' });
        Animated.parallel([fadeIn(), moveCenter()]).start();
      });
    }
  };

  const currentQuestion = React.useMemo(() => questions[currentQuestionIndex], [
    questions,
    currentQuestionIndex
  ]);

  return {
    answerQuestion,
    answers,
    currentQuestion,
    currentQuestionIndex,
    goBack,
    labelOpacity,
    labelPositionOffset
  };
};
