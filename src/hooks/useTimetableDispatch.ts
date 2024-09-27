import { useContext } from "react";

import { TimetableDispatchContext } from "../contexts/TimetableContext";

export default function useTimetableDispatch() {
  const context = useContext(TimetableDispatchContext);

  if (!context) {
    throw new Error("TimetableDispatchContext 문제가 있음");
  }

  return context;
}
