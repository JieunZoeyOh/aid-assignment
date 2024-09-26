import { useEffect } from "react";

type AlertProps = {
  message: string;
  clearMessage: () => void;
};

export default function Alert({ message, clearMessage }: AlertProps) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      clearMessage();
    }, 2000);

    return () => clearTimeout(timer);
  }, [message, clearMessage]);

  return (
    <div
      className="absolute top-4 left-1/2 p-4 mb-4 text-sm text-blue-800 rounded-full bg-blue-50"
      role="alert"
    >
      <span className="font-medium">{message}</span>
    </div>
  );
}
