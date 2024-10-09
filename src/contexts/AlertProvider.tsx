import { ReactElement, useReducer } from "react";

import { AlertDispatchContext, AlertStateContext } from "./AlertContext";

import { AlertAction, AlertState } from "./stateTypes";

type AlertProviderProps = {
  children: ReactElement;
};

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

const initialState: AlertState = {
  message: "",
};

function reducer(state: AlertState, action: AlertAction): AlertState {
  switch (action.type) {
    case "CLOSE_ALERT": {
      return {
        ...state,
        message: "",
      };
    }
    case "SHOW_ALERT": {
      return {
        ...state,
        message: action.payload.message,
      };
    }
    default:
      return state;
  }
}
