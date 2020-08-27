import { Question } from "../types/questions";

type State = {
  questions: Map<number, Question>;
};

type AnswerQuestion = {
  type: "answer_question";
  answer: boolean;
  index: number;
};

type LoadQuestions = {
  type: "load_questions";
  questions: Question[];
};

type Action = AnswerQuestion | LoadQuestions;

const reducer = (currentState: State, action: Action): State => {
  switch (action.type) {
    case "load_questions":
      let questionMap = new Map(
        action.questions.map((value, index) => [index, value])
      );
      return { ...currentState, questions: questionMap };
    case "answer_question":
      const question = currentState.questions.get(action.index);
      if (!question) {
        throw Error("Error trying to update unexisting question.");
      } else {
        const questions = new Map(
          currentState.questions.set(action.index, question)
        );
        return { ...currentState, questions };
      }
  }
};
