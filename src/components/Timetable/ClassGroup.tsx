import { useEffect, useRef } from "react";

type ClassGroupProps = {
  name: string;
  isActive?: boolean;
};

export default function ClassGroup({
  name,
  isActive = false,
}: ClassGroupProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && isActive) {
      inputRef.current.value = name;
      inputRef.current.focus();
    }
  }, [isActive, name]);

  return (
    <li className="me-2">
      <button
        className={`inline-block p-4 border-b-2 rounded-t-lg ${isActive ? "border-rose-600 text-rose-600" : "border-transparent text-gray-400 hover:text-gray-600 hover:border-gray-300"}`}
      >
        {isActive ? (
          <input type="text" ref={inputRef} className="w-16" />
        ) : (
          <span>{name}</span>
        )}
      </button>
    </li>
  );
}
