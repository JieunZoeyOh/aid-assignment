import Button from "../Common/Button";
import TimeInput from "../Common/TimeInput";

import { TimeRange } from "../../types";

type CourseBlockProps = {
  courseNumber: number;
  onStartTimeChange: (hour: string, minute: string) => void;
  onEndTimeChange: (hour: string, minute: string) => void;
  onDeleteCourseClick: () => void;
} & TimeRange;

export default function CourseBlock({
  startTime,
  endTime,
  courseNumber,
  onStartTimeChange,
  onEndTimeChange,
  onDeleteCourseClick,
}: CourseBlockProps) {
  return (
    <li className="py-3">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2 gap-2">
          <div className="text-sm">{courseNumber}교시</div>
          <TimeInput {...startTime} onTimeChange={onStartTimeChange} />
          <span className="flex items-center">~</span>
          <TimeInput {...endTime} onTimeChange={onEndTimeChange} />
          <Button
            label="삭제"
            onClick={onDeleteCourseClick}
            buttonSize="btn-sm"
            buttonType="btn-red"
          />
        </div>
      </div>
    </li>
  );
}
