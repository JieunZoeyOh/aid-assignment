import { ReactElement, useReducer } from "react";

import reducer from "../state/alertReducer";
import initialState from "../state/alertInitialState";
import { AlertDispatchContext, AlertStateContext } from "./AlertContext";

interface AlertProviderProps {
  children: ReactElement;
}

export default function AlertProvider({ children }: AlertProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AlertStateContext.Provider value={state}>
      <AlertDispatchContext.Provider value={dispatch}>
        {children}
      </AlertDispatchContext.Provider>
    </AlertStateContext.Provider>
  );
}
