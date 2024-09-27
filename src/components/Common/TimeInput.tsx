import TimeSelect from "./TimeSelect";
import { Time } from "../../types";

type TimeInputProps = {
  onTimeChange: (hour: string, minute: string) => void;
} & Time;

const HOURS = new Array(24)
  .fill("0")
  .map((item, index) => index.toString().padStart(2, item));

const MINUTES = new Array(60)
  .fill("0")
  .map((item, index) => index.toString().padStart(2, item));

export default function TimeInput({
  hour,
  minute,
  onTimeChange,
}: TimeInputProps) {
  const handleHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedHour = event.target.value;
    onTimeChange(selectedHour, minute);
  };

  const handleMinuteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMinute = event.target.value;
    onTimeChange(hour, selectedMinute);
  };

  return (
    <div className="relative flex-grow w-20 rounded-lg p-1.5 text-sm text-gray-900 bg-gray-50 border border-gray-300">
      <TimeSelect
        time={hour}
        handleTimeChange={handleHourChange}
        items={HOURS}
      />
      <span>:</span>
      <TimeSelect
        time={minute}
        handleTimeChange={handleMinuteChange}
        items={MINUTES}
      />
      <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-1.5 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
