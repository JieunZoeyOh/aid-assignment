import { useContext } from "react";

import { AlertDispatchContext } from "../contexts/AlertContext";

export default function useAlertDispatch() {
  const context = useContext(AlertDispatchContext);

  if (!context) {
    throw new Error("AlertDispatchContext 문제가 있음");
  }

  return context;
}
