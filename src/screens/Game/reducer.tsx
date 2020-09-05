import { Map } from 'immutable';
import { Reducer } from 'react';

import { Question } from '../../types/questions';

export type GameState = {
  currentQuestionIndex: number;
  questions: Question[];
  answers: Map<number, boolean>;
};

type AnswerQuestion = {
  type: 'answer_question';
  value: boolean;
};

type GoBack = {
  type: 'go_back';
};

type Progress = {
  type: 'progress';
};

export type GameAction = AnswerQuestion | GoBack | Progress;

export const reducer: Reducer<GameState, GameAction> = (currState, action) => {
  const { answers, currentQuestionIndex, questions } = currState;

  switch (action.type) {
    case 'answer_question':
      const question = questions[currentQuestionIndex];

      if (question) {
        const newAnswers = answers.set(currentQuestionIndex, action.value);

        return {
          ...currState,
          answers: newAnswers
        };
      } else {
        throw new Error(
          'Something went wrong: You tried to answer a question that does not exist. Please report this situation to our support team.'
        );
      }

    case 'progress':
      return {
        ...currState,
        currentQuestionIndex:
          currentQuestionIndex < questions.length - 1
            ? currentQuestionIndex + 1
            : currentQuestionIndex
      };

    case 'go_back':
      return {
        ...currState,
        currentQuestionIndex:
          currentQuestionIndex > 0
            ? currentQuestionIndex - 1
            : currentQuestionIndex
      };
  }
};
