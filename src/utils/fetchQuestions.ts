import { Category, Difficulty, Question } from '../types/questions';

type Options = {
  difficulty?: Difficulty;
  category?: Category;
};

export const parseQuestion = (text: string): string =>
  text.replace(/&quot;/g, '"').replace(/&#039;/g, "'");

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
  const questions = data.results as Question[];
  return questions.map((question) => ({
    ...question,
    question: parseQuestion(question.question)
  }));
};
