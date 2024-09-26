type ButtonProps = {
  title: string;
  onClick: () => void;
  isWidthFull?: boolean;
  buttonType?: string;
  buttonSize?: string;
};

export default function Button(props: ButtonProps) {
  const {
    title,
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
      {title}
    </button>
  );
}
