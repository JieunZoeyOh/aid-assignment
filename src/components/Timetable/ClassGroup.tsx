type ClassGroupProps = {
  name: string;
  setName?: (name: string) => void;
  isActive?: boolean;
};

export default function ClassGroup({
  name,
  setName,
  isActive = false,
}: ClassGroupProps) {
  const buttonStyle = isActive
    ? "border-rose-600 text-rose-600"
    : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300";

  const handleClassNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (setName) {
      setName(event.target.value);
    }
  };

  return (
    <li className="me-2">
      <button
        className={`inline-block p-4 border-b-2 rounded-t-lg ${buttonStyle}`}
      >
        {isActive ? (
          <input
            type="text"
            value={name}
            onChange={handleClassNameChange}
            className="w-16"
          />
        ) : (
          <span>{name}</span>
        )}
      </button>
    </li>
  );
}
