import { useContext } from "react";

import { AlertStateContext } from "../contexts/AlertContext";

export default function useAlertState() {
  const context = useContext(AlertStateContext);

  if (!context) {
    throw new Error("AlertStateContext 문제가 있음");
  }

  return context;
}
