import { createContext, Dispatch } from "react";

import { AlertAction, AlertState } from "./stateTypes";

export const AlertStateContext = createContext<AlertState | null>(null);
export const AlertDispatchContext = createContext<Dispatch<AlertAction> | null>(
  null,
);
