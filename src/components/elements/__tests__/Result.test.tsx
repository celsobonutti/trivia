import '@testing-library/jest-native/extend-expect';
import React from 'react';
import { render } from '@testing-library/react-native';
import { Result } from '../Result';

describe('<Result />', () => {
  it('renders correctly when the answer is right', () => {
    const { getByText, getByTestId } = render(
      <Result
        answer={{
          question: 'Is this right?',
          correctAnswer: true,
          selectedAnswer: true
        }}
      />
    );

    const container = getByTestId('result');
    const question = getByText('Is this right?');

    expect(container).toContainElement(question);
    expect(container).toHaveStyle({
      borderColor: '#007E33'
    });
  });

  it('renders correctly when the answer is wrong', () => {
    const { getByText, getByTestId } = render(
      <Result
        answer={{
          question: 'Is this wrong?',
          correctAnswer: true,
          selectedAnswer: false
        }}
      />
    );

    const container = getByTestId('result');
    const question = getByText('Is this wrong?');

    expect(container).toContainElement(question);
    expect(container).toHaveStyle({
      borderColor: '#ff4444'
    });
  });
});
