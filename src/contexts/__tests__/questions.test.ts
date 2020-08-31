import { Question } from '../../types/questions';
import { reducer, State } from '../questions';

describe('it updates correctly state correctly when', () => {
  let initialState: State = {
    questions: new Map()
  };

  let questions: Question[] = [
    {
      answer: true,
      category: '',
      difficulty: 'easy',
      question: 'In what year was the last natural case of smallpox documented?'
    },
    {
      answer: false,
      category: '',
      difficulty: 'hard',
      question:
        'The cover of The Beatles album &quot;Abbey Road&quot; featured a Volkswagen Beetle in the background.'
    }
  ];

  let state = reducer(initialState, {
    type: 'load_questions',
    questions: questions
  });

  it('when loading data', () => {
    expect(state.questions.size).toBe(2);
    expect(state.questions.get(0)?.question).toBe(
      'In what year was the last natural case of smallpox documented?'
    );
    expect(state.questions.get(1)?.question).toBe(
      'The cover of The Beatles album &quot;Abbey Road&quot; featured a Volkswagen Beetle in the background.'
    );
    expect(state.questions.get(1)?.selectedAnswer).toBeUndefined();
  });

  it('when answering questions', () => {
    let newState = reducer(state, {
      type: 'answer_question',
      index: 0,
      answer: true
    });

    expect(newState.questions.get(0)?.selectedAnswer).toBe(true);

    newState = reducer(state, {
      type: 'answer_question',
      index: 1,
      answer: false
    });

    expect(newState.questions.get(1)?.selectedAnswer).toBe(false);
  });
});
