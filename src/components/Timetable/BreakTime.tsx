import TimeInput from "../Common/TimeInput";

type BreakTimeProps = {
  label: string;
  breakTime: {
    startTime: {
      hour: string;
      minute: string;
    };
    endTime: {
      hour: string;
      minute: string;
    };
  };
  onStartTimeChange: (hour: string, minute: string) => void;
  onEndTimeChange: (hour: string, minute: string) => void;
};

export default function BreakTime({
  label,
  breakTime,
  onStartTimeChange,
  onEndTimeChange,
}: BreakTimeProps) {
  return (
    <div className="flex items-center justify-center gap-4 pt-2">
      <div className="text-sm">{label}</div>
      <div className="flex flex-wrap min-w-0 text-sm font-medium text-gray-900 items-center">
        <TimeInput
          hour={breakTime.startTime.hour}
          minute={breakTime.startTime.minute}
          onTimeChange={onStartTimeChange}
        />
        <span className="px-2 flex items-center">~</span>
        <TimeInput
          hour={breakTime.endTime.hour}
          minute={breakTime.endTime.minute}
          onTimeChange={onEndTimeChange}
        />
      </div>
    </div>
  );
}
