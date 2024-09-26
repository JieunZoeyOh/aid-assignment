import Button from "./Button";

type ModalProps = {
  description: string;
  buttonLabel: string;
  onCloseClick: () => void;
};

export default function Modal({
  description,
  buttonLabel,
  onCloseClick,
}: ModalProps) {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900/50"
      onClick={onCloseClick}
    >
      <div
        className="bg-white rounded-lg p-4 relative w-96 h-44 flex flex-col justify-between"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="py-4 px-2 text-lg font-semibold text-gray-800">
          {description}
        </p>
        <div className="flex justify-end">
          <Button label="취소" onClick={onCloseClick} />
          <Button
            label={buttonLabel}
            onClick={onCloseClick}
            buttonType="btn-red"
          />
        </div>
      </div>
    </div>
  );
}
