import '@testing-library/jest-native/extend-expect';
import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react-native';
import waitForExpect from 'wait-for-expect';

import responseSample from '../../../test_helpers/response_sample.json';
import { Game } from '../Game';
import { parseQuestions } from '../../../utils/fetchQuestions';

const questions = parseQuestions(responseSample.results);

const renderGame = () => {
  const { getByA11yLabel, getByText, getByTestId } = render(
    <Game questions={questions} />
  );

  const goBackButton = getByText('Go back');
  const questionCounter = getByA11yLabel('Current question');
  const questionContainer = getByA11yLabel('Question');
  const trueButton = getByTestId('true');
  const falseButton = getByTestId('false');

  return {
    getByA11yLabel,
    getByText,
    getByTestId,
    goBackButton,
    questionCounter,
    questionContainer,
    trueButton,
    falseButton
  };
};

describe('<Game />', () => {
  it('renders correctly', async () => {
    const {
      getByText,
      questionContainer,
      goBackButton,
      questionCounter
    } = renderGame();

    await act(async () => {
      const label = getByText(questions[0].label);
      const category = getByText(questions[0].category);

      expect(questionContainer).toContainElement(label);
      expect(questionContainer).toContainElement(category);
      expect(goBackButton).toBeDisabled();
      expect(questionCounter).toHaveTextContent('1/4');
    });
  });

  it('progresses to the next question', async () => {
    const {
      trueButton,
      getByText,
      questionContainer,
      goBackButton,
      questionCounter
    } = renderGame();
    fireEvent.press(trueButton);
    const label = await waitFor(() => getByText(questions[1].label));
    const category = getByText(questions[1].category);

    expect(questionContainer).toContainElement(label);
    expect(questionContainer).toContainElement(category);
    expect(goBackButton).toBeEnabled();
    expect(questionCounter).toHaveTextContent('2/4');
  });

  it('goes back correctly', async () => {
    const {
      trueButton,
      getByText,
      questionContainer,
      goBackButton,
      questionCounter
    } = renderGame();
    await act(async () => {
      fireEvent.press(trueButton);

      await waitForExpect(() => {
        expect(goBackButton).toBeEnabled();
        expect(questionCounter).toHaveTextContent('2/4');
      });

      fireEvent.press(goBackButton);

      await waitForExpect(() => {
        const label = getByText(questions[0].label);
        expect(questionContainer).toContainElement(label);
        expect(questionCounter).toHaveTextContent('1/4');
      });
    });
  });
});
