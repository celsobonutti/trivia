import '@testing-library/jest-native/extend-expect';
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { Results } from '../Results';
import responseSample from '../../../test_helpers/response_sample.json';
import { parseQuestions } from '../../../utils/fetchQuestions';

const questions = parseQuestions(responseSample.results);

describe('<Results />', () => {
  it('renders and run functions correctly', () => {
    const answers = questions.map((question, index) => {
      return {
        question: question.label,
        correctAnswer: question.answer,
        selectedAnswer: index % 2 === 0
      };
    });

    const goToHome = jest.fn();
    const playAgain = jest.fn();

    const { getByA11yLabel, getAllByTestId, getByTestId } = render(
      <Results
        answers={answers}
        onGoToHome={goToHome}
        onPlayAgain={playAgain}
      />
    );

    const resultContainer = getByA11yLabel('Results');
    const results = getAllByTestId('result');

    expect(resultContainer).not.toBeEmpty();

    results.forEach((result) => {
      expect(resultContainer).toContainElement(result);
    });

    const goHomeButton = getByTestId('go_home');

    fireEvent.press(goHomeButton);

    expect(goToHome).toHaveBeenCalled();

    const playAgainButton = getByTestId('play_again');

    fireEvent.press(playAgainButton);

    expect(playAgain).toHaveBeenCalled();
  });
});
