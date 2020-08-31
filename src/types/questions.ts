export type Difficulty = 'any' | 'easy' | 'medium' | 'hard';

export type Category = {
  label: string;
  value: string;
};

export type Question = {
  category: string;
  difficulty: Difficulty;
  answer: boolean;
  selectedAnswer?: boolean;
  question: string;
};
