import { Category, Difficulty, Question } from "../types/questions";

type Options = {
  difficulty?: Difficulty;
  category?: Category;
};

const makeQueryString = ({ difficulty, category }: Options) =>
  `${difficulty && `&difficulty=${difficulty}`}${
    category && `&category=${category.id}`
  }`;

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
