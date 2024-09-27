import { useEffect } from "react";
import useAlertState from "../../hooks/useAlertState";
import useAlertDispatch from "../../hooks/useAlertDispatch";

export default function Alert() {
  const state = useAlertState();
  const dispatch = useAlertDispatch();

  useEffect(() => {
    if (!state.message) return;

    const timer = setTimeout(() => {
      dispatch({ type: "CLOSE_ALERT" });
    }, 2000);

    return () => clearTimeout(timer);
  }, [state.message, dispatch]);

  return (
    <div
      className="absolute top-4 left-1/2 p-4 mb-4 text-sm text-blue-800 rounded-full bg-blue-50"
      role="alert"
    >
      <span className="font-medium">{state.message}</span>
    </div>
  );
}
