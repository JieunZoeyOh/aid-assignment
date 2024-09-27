import { createContext, Dispatch } from "react";

import { ModalAction, ModalState } from "../types";

export const ModalStateContext = createContext<ModalState | null>(null);
export const ModalDispatchContext = createContext<Dispatch<ModalAction> | null>(
  null,
);
