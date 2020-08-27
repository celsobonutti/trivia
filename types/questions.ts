export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export type Category = {
  label: string,
  id: number
};

export type Question = {
  category: Category;
  difficulty: Difficulty;
  answer: boolean;
  selectedAnswer: boolean;
};