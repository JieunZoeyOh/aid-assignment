import { ModalAction, ModalState } from "./stateTypes";

export default function reducer(
  state: ModalState,
  action: ModalAction,
): ModalState {
  switch (action.type) {
    case "CLOSE_MODAL": {
      return {
        ...state,
        message: "",
        label: "",
        onClick: () => {},
      };
    }
    case "SHOW_MODAL": {
      return {
        ...state,
        message: action.payload.message,
        label: action.payload.label,
        onClick: action.payload.onClick,
      };
    }
    default:
      return state;
  }
}
