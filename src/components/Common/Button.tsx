type ButtonProps = {
  label: string;
  onClick: () => void;
  isWidthFull?: boolean;
  buttonType?: string;
  buttonSize?: string;
};

export default function Button(props: ButtonProps) {
  const {
    label,
    onClick,
    isWidthFull = false,
    buttonType = "btn-light",
    buttonSize = "btn-base",
  } = props;

  return (
    <button
      type="button"
      className={`${buttonType} ${buttonSize} ${isWidthFull && "w-full"} rounded-lg`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
