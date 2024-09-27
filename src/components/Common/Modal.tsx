import Button from "./Button";

import useModalDispatch from "../../hooks/useModalDispatch";
import useModalState from "../../hooks/useModalState";

export default function Modal() {
  const state = useModalState();
  const dispatch = useModalDispatch();

  const handleCloseClick = () => {
    dispatch({
      type: "CLOSE_MODAL",
    });
  };

  const handleConfirmClick = () => {
    state.onClick();
    handleCloseClick();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900/50"
      onClick={handleCloseClick}
    >
      <div
        className="bg-white rounded-lg p-4 relative w-96 h-44 flex flex-col justify-between"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="py-4 px-2 text-lg font-semibold text-gray-800">
          {state.message}
        </p>
        <div className="flex justify-end">
          <Button label="취소" onClick={handleCloseClick} />
          <Button
            label={state.label}
            onClick={handleConfirmClick}
            buttonType="btn-red"
          />
        </div>
      </div>
    </div>
  );
}
