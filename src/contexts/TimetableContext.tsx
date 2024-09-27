import { createContext, Dispatch } from "react";

import { TimetableState, TimetableAction } from "../types";

export const TimetableStateContext = createContext<TimetableState | null>(null);
export const TimetableDispatchContext =
  createContext<Dispatch<TimetableAction> | null>(null);
