import React, { FunctionComponent } from 'react';
import { Category, Difficulty } from '../types/questions';

export type TriviaState = {
  difficulty: Difficulty;
  category: Category;
};

type SelectState = {
  type: 'select';
  difficulty: Difficulty;
  category: Category;
};

type TriviaAction = SelectState;

const reducer = (currState: TriviaState, action: TriviaAction): TriviaState => {
  switch (action.type) {
    case 'select':
      return {
        difficulty: action.difficulty,
        category: action.category
      };
  }
};

type Context = {
  state: TriviaState;
  dispatch: React.Dispatch<TriviaAction>;
};

const TriviaContext = React.createContext<Context | null>(null);

export const useTriviaContext = () =>
  React.useContext(TriviaContext) as Context;

export const TriviaProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    difficulty: 'any',
    category: { value: '0', label: 'Any Category' }
  });

  return (
    <TriviaContext.Provider value={{ state, dispatch }}>
      {children}
    </TriviaContext.Provider>
  );
};
