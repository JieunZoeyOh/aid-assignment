import { useContext } from "react";
import { ModalStateContext } from "../contexts/ModalContext";

export default function useModalState() {
  const context = useContext(ModalStateContext);

  if (!context) {
    throw new Error("ModalStateContext 문제가 있음");
  }

  return context;
}
