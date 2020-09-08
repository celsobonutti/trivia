import '@testing-library/jest-native/extend-expect';
import React from 'react';
import { render } from '@testing-library/react-native';

import { Results } from '../Results';
import responseSample from '../../../test_helpers/response_sample.json';
import { parseQuestions } from '../../../utils/fetchQuestions';

const questions = parseQuestions(responseSample.results);

describe('<Results />', () => {
  it('renders correctly', () => {
    const answers = questions.map((question, index) => {
      return {
        question: question.label,
        correctAnswer: question.answer,
        selectedAnswer: index % 2 === 0
      };
    });

    const { getByA11yLabel, getAllByTestId } = render(
      <Results answers={answers} />
    );

    const resultContainer = getByA11yLabel('Results');
    const results = getAllByTestId('result');

    expect(resultContainer).not.toBeEmpty();

    results.forEach((result) => {
      expect(resultContainer).toContainElement(result);
    });
  });
});
