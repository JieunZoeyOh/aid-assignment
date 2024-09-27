import { AlertAction, AlertState } from "./stateTypes";

export default function reducer(
  state: AlertState,
  action: AlertAction,
): AlertState {
  switch (action.type) {
    case "CLOSE_ALERT": {
      return {
        ...state,
        message: "",
      };
    }
    case "SHOW_ALERT": {
      return {
        ...state,
        message: action.payload.message,
      };
    }
    default:
      return state;
  }
}
