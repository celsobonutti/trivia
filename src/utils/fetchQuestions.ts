import { Category, Difficulty, Question } from '../types/questions';

type Options = {
  difficulty?: Difficulty;
  category?: Category;
};

export const makeQueryString = ({ difficulty, category }: Options) => {
  let queryString = '';
  if (difficulty && difficulty !== Difficulty.Any) {
    queryString = queryString.concat(`&difficulty=${difficulty}`);
  }
  if (category && category?.value !== '0') {
    queryString = queryString.concat(`&category=${category?.value}`);
  }
  return queryString;
};

export const fetchQuestions = async (options: Options) => {
  try {
    let queryString = makeQueryString(options);
    let response = await fetch(
      `https://opentdb.com/api.php?amount=10${queryString}`
    );
    let data = await response.json();
    return data.results as Question[];
  } catch (e) {
    // TO-DO
  }
};
