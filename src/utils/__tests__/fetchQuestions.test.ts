import responseSample from '../../test_helpers/response_sample.json';
import fetchMock from 'jest-fetch-mock';

import {
  makeQueryString,
  parseQuestion,
  parseQuestions,
  parseQuestionText,
  fetchQuestions
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
  const jsonQuestions = responseSample.results;

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

  test('when parsing a full body', () => {
    const question = parseQuestion(jsonQuestions[0]);

    expect(question.label).toBe(
      'Pac-Man was invented by the designer Toru Iwatani while he was eating pizza.'
    );
    expect(question.difficulty).toBe('easy');
    expect(question.answer).toBe(true);
    expect(question.category).toBe('Entertainment: Video Games');
  });

  test('when parsing a group of questions', () => {
    const questions = parseQuestions(jsonQuestions);

    questions.forEach((question, index) => {
      expect(question).toStrictEqual(parseQuestion(jsonQuestions[index]));
    });
  });

  test('when fetching from the API', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(responseSample));

    fetchQuestions({}).then((data) => {
      expect(data).toStrictEqual(parseQuestions(jsonQuestions));
    });
  });
});
