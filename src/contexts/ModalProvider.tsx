import { ReactElement, useReducer } from "react";

import reducer from "../state/modalReducer";
import initialState from "../state/modalInitialState";
import { ModalDispatchContext, ModalStateContext } from "./ModalContext";

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
