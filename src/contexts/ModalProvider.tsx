import { ReactElement, useReducer } from "react";

import { ModalDispatchContext, ModalStateContext } from "./ModalContext";
import { ModalAction, ModalState } from "./stateTypes";

type ModalProviderProps = {
  children: ReactElement;
};

export default function ModalProvider({ children }: ModalProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ModalStateContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}

const initialState: ModalState = {
  message: "",
  label: "",
  onClick: () => {},
};

function reducer(state: ModalState, action: ModalAction): ModalState {
  switch (action.type) {
    case "CLOSE_MODAL": {
      return {
        ...state,
        message: "",
        label: "",
        onClick: () => {},
      };
    }
    case "SHOW_MODAL": {
      return {
        ...state,
        message: action.payload.message,
        label: action.payload.label,
        onClick: action.payload.onClick,
      };
    }
    default:
      return state;
  }
}
