import { useContext } from "react";

import { ModalDispatchContext } from "../contexts/ModalContext";

export default function useModalDispatch() {
  const context = useContext(ModalDispatchContext);

  if (!context) {
    throw new Error("ModalDispatchContext 문제가 있음");
  }

  return context;
}
