import React, { createContext, useReducer, useContext } from 'react';

type State = {
  hover: string | null;
  position: number;
};

type Action =
  | { type: 'SET_HOVER'; hover: string | null }
  | { type: 'SET_POSITION'; position: number };

type DragDispatch = React.Dispatch<Action>;

const DragStateContext = createContext<State>({} as State);
const DragDispatchContext = createContext<DragDispatch>({} as DragDispatch);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_HOVER':
      if (state.hover === action.hover) {
        return state;
      }
      return {
        ...state,
        hover: action.hover,
      };
    case 'SET_POSITION':
      if (state.position === action.position) {
        return state;
      }
      return {
        ...state,
        position: action.position,
      };
    default:
      throw new Error('Unhandled action');
  }
};
const DragProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    hover: null,
    position: 0,
  });
  return (
    <DragDispatchContext.Provider value={dispatch}>
      <DragStateContext.Provider value={state}>
        {children}
      </DragStateContext.Provider>
    </DragDispatchContext.Provider>
  );
};
export default DragProvider;

export const useDragState = (): State => useContext(DragStateContext);
export const useDragDispatch = (): DragDispatch =>
  useContext(DragDispatchContext);
