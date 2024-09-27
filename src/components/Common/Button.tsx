import { ButtonProps } from "../../types";

export default function Button(props: ButtonProps) {
  const {
    label,
    onClick,
    isWidthFull = false,
    isDisabled = false,
    buttonType = "btn-light",
    buttonSize = "btn-base",
  } = props;

  const handleButtonClick = () => {
    if (!isDisabled) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={`${isDisabled ? "btn-gray" : buttonType} ${buttonSize} ${isWidthFull && "w-full"} rounded-lg`}
      onClick={handleButtonClick}
    >
      {label}
    </button>
  );
}
