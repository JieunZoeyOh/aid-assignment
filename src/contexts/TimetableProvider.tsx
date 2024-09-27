import { ReactElement, useReducer } from "react";

import reducer from "../state/timetableReducer";
import initialState from "../state/timetableInitialState";
import {
  TimetableDispatchContext,
  TimetableStateContext,
} from "./TimetableContext";

type TimetableProviderProps = {
  children: ReactElement;
};

export default function TimetableProvider({
  children,
}: TimetableProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TimetableStateContext.Provider value={state}>
      <TimetableDispatchContext.Provider value={dispatch}>
        {children}
      </TimetableDispatchContext.Provider>
    </TimetableStateContext.Provider>
  );
}
