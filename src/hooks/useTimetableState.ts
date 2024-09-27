import { useContext } from "react";
import { TimetableStateContext } from "../contexts/TimetableContext";

export default function useTimetableState() {
  const context = useContext(TimetableStateContext);

  if (!context) {
    throw new Error("TimeTableStateContext 문제가 있음");
  }

  return context;
}
