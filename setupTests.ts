import 'react-native-gesture-handler/jestSetup';
import 'jest';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  Reanimated.default.call = () => {};

  return Reanimated;
});

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
