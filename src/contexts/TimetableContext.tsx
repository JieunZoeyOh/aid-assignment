import { createContext, Dispatch } from "react";

import { TimetableAction, TimetableState } from "../state/stateTypes";

export const TimetableStateContext = createContext<TimetableState | null>(null);
export const TimetableDispatchContext =
  createContext<Dispatch<TimetableAction> | null>(null);
