import '@testing-library/jest-native/extend-expect';
import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import fetchMock from 'jest-fetch-mock';

import responseSample from '../../../test_helpers/response_sample.json';
import { Home } from '../Home';
import waitForExpect from 'wait-for-expect';

const renderHome = () => {
  const mockFunction = jest.fn();

  const { getByTestId, getByA11yLabel, getByText } = render(
    <Home goToGame={mockFunction} />
  );

  return {
    mockFunction,
    getByTestId,
    getByA11yLabel,
    getByText
  };
};

describe('<Home />', () => {
  it('renders correctly', async () => {
    const { getByTestId, mockFunction } = renderHome();

    await act(async () => {
      fetchMock.mockResponseOnce(JSON.stringify(responseSample));

      const playButton = getByTestId('play');
      fireEvent.press(playButton);

      waitForExpect(() => {
        expect(mockFunction).toBeCalled();
      });
    });
  });
});
