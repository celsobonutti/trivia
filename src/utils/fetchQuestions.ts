import { Category, Difficulty, Question } from '../types/questions';

type Options = {
  difficulty?: Difficulty;
  category?: Category;
};

export const parseQuestionText = (text: string): string =>
  text.replace(/&quot;/g, '"').replace(/&#039;/g, "'");

export const parseQuestion = (jsonQuestion: any): Question => ({
  category: jsonQuestion.category,
  answer: jsonQuestion.correct_answer === 'True',
  difficulty: jsonQuestion.difficulty,
  label: parseQuestionText(jsonQuestion.question)
});

export const parseQuestions = (jsonQuestions: any[]): Question[] =>
  jsonQuestions.map(parseQuestion);

export const makeQueryString = ({ difficulty, category }: Options) => {
  let queryString = '';
  if (difficulty && difficulty !== 'any') {
    queryString = queryString.concat(`&difficulty=${difficulty}`);
  }
  if (category && category?.value !== '0') {
    queryString = queryString.concat(`&category=${category?.value}`);
  }
  return queryString;
};

export const fetchQuestions = async (options: Options) => {
  const queryString = makeQueryString(options);
  const response = await fetch(
    `https://opentdb.com/api.php?amount=10&type=boolean${queryString}`
  );
  const data = await response.json();
  const questions = data.results;
  return parseQuestions(questions);
};
