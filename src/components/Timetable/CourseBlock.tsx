import { useState } from "react";

import Button from "../Common/Button";
import TimeInput from "../Common/TimeInput";

export default function CourseBlock() {
  const [startTime, setStartTime] = useState({ hour: "00", minute: "00" });
  const [endTime, setEndTime] = useState({ hour: "00", minute: "00" });

  const handleStartTimeChange = (hour: string, minute: string) => {
    setStartTime(() => ({
      hour,
      minute,
    }));
  };

  const handleEndTimeChange = (hour: string, minute: string) => {
    setEndTime(() => ({
      hour,
      minute,
    }));
  };

  return (
    <li className="py-3">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2 gap-2">
          <div className="text-sm">1교시</div>
          <TimeInput {...startTime} onTimeChange={handleStartTimeChange} />
          <span className="flex items-center">~</span>
          <TimeInput {...endTime} onTimeChange={handleEndTimeChange} />
          <Button
            label="삭제"
            onClick={() => {}}
            buttonSize="btn-sm"
            buttonType="btn-red"
          />
        </div>
      </div>
    </li>
  );
}
