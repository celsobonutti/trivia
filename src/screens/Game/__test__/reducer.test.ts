import sampleData from '../../../test_helpers/response_sample.json';
import { Map } from 'immutable';

import { parseQuestions } from '../../../utils/fetchQuestions';
import { GameState, reducer } from '../reducer';

describe('updates state correctly', () => {
  const initialState: GameState = {
    questions: parseQuestions(sampleData.results),
    answers: Map(),
    currentQuestionIndex: 0
  };

  test('when answering a question', () => {
    const newState = reducer(initialState, {
      type: 'answer_question',
      value: false
    });

    expect(newState.answers.get(0)).toBe(false);
  });

  test('when progressing', () => {
    const newState = reducer(initialState, { type: 'progress' });

    expect(newState.currentQuestionIndex).toBe(1);
  });

  test('when trying to progress beyond limits', () => {
    const newState = reducer(
      {
        ...initialState,
        currentQuestionIndex: initialState.questions.length - 1
      },
      { type: 'progress' }
    );

    expect(newState.currentQuestionIndex).toBe(
      initialState.questions.length - 1
    );
  });

  test('when going back', () => {
    const newState = reducer(
      {
        ...initialState,
        currentQuestionIndex: 1
      },
      { type: 'go_back' }
    );

    expect(newState.currentQuestionIndex).toBe(0);
  });

  test('when trying to go below the first question', () => {
    const newState = reducer(initialState, { type: 'go_back' });

    expect(newState.currentQuestionIndex).toBe(0);
  });
});
