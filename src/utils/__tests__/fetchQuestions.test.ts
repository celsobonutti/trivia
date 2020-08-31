import { makeQueryString } from '../fetchQuestions';

describe('it generates query strings correctly', () => {
  test('when every option is passed', () => {
    const queryString = makeQueryString({
      difficulty: 'hard',
      category: { value: '10', label: 'Entertainment: Books' }
    });

    expect(queryString).toBe('&difficulty=hard&category=10');
  });

  test('when no option is passed', () => {
    const queryString = makeQueryString({});

    expect(queryString).toBe('');
  });

  test('when only difficulty is passed', () => {
    const queryString = makeQueryString({ difficulty: 'medium' });

    expect(queryString).toBe('&difficulty=medium');
  });

  test('when only category is passed', () => {
    const queryString = makeQueryString({
      category: { value: '10', label: 'Entertainment: Books' }
    });

    expect(queryString).toBe('&category=10');
  });

  test("when 'any' options are passed", () => {
    const queryString = makeQueryString({
      difficulty: 'any',
      category: { value: '0', label: 'Any' }
    });

    expect(queryString).toBe('');
  });
});
