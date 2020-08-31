import { Question } from '../types/questions';

export type State = {
  questions: Map<number, Question>;
};

export type AnswerQuestion = {
  type: 'answer_question';
  answer: boolean;
  index: number;
};

export type LoadQuestions = {
  type: 'load_questions';
  questions: Question[];
};

export type Action = AnswerQuestion | LoadQuestions;

export const reducer = (currentState: State, action: Action): State => {
  switch (action.type) {
    case 'load_questions':
      let questionMap = new Map(
        action.questions.map((value, index) => [index, value])
      );
      return { ...currentState, questions: questionMap };
    case 'answer_question':
      const question = currentState.questions.get(action.index);
      if (!question) {
        throw Error('Error trying to update unexisting question.');
      } else {
        currentState.questions.set(action.index, {
          ...question,
          answer: action.answer
        });
        const questions = new Map(currentState.questions);
        return { ...currentState, questions };
      }
  }
};
