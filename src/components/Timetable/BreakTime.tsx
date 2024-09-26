import TimeInput from "../Common/TimeInput";

export default function BreakTime() {
  return (
    <div className="gap-4 py-6 lg:flex">
      <div className="flex items-center justify-center gap-4 pt-2">
        <div className="text-sm">점심</div>
        <div className="flex flex-wrap min-w-0 text-sm font-medium text-gray-900 items-center">
          <TimeInput />
          <span className="px-2 flex items-center">~</span>
          <TimeInput />
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 pt-2">
        <div className="text-sm">저녁</div>
        <div className="flex flex-wrap min-w-0 text-sm font-medium text-gray-900 items-center">
          <TimeInput />
          <span className="px-2 flex items-center">~</span>
          <TimeInput />
        </div>
      </div>
    </div>
  );
}
