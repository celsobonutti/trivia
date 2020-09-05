import questions from '../../test_helpers/response_sample.json';

import {
  makeQueryString,
  parseQuestion,
  parseQuestionText
} from '../fetchQuestions';

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

describe('it parses questions correctly', () => {
  test('when its text has double quotes', () => {
    const question = 'Do you like &quot;memes&quot;?';

    const parsedQuestion = parseQuestionText(question);

    expect(parsedQuestion).toBe('Do you like "memes"?');
  });

  test('when its text has single-quotes', () => {
    const question = 'Do you like &#039;memes&#039;?';

    const parsedQuestion = parseQuestionText(question);

    expect(parsedQuestion).toBe("Do you like 'memes'?");
  });

  test('when its text has both single and double quotes', () => {
    const question = 'Do you like &quot;memes&#039;?';

    const parsedQuestion = parseQuestionText(question);

    expect(parsedQuestion).toBe('Do you like "memes\'?');
  });

  test('when parsing a full body', () => {});
});
