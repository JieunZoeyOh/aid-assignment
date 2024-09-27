import Button from "../Common/Button";
import TimeInput from "../Common/TimeInput";

import useTimetableDispatch from "../../hooks/useTimetableDispatch";
import useTimetableState from "../../hooks/useTimetableState";

import { TimeRange } from "../../types";
import useModalDispatch from "../../hooks/useModalDispatch";

type CourseBlockProps = {
  slotIndex: number;
  courseId: string;
  courseNumber: number;
} & TimeRange;

export default function CourseBlock({
  slotIndex,
  courseId,
  courseNumber,
  startTime,
  endTime,
}: CourseBlockProps) {
  const timetableDispatch = useTimetableDispatch();
  const modalDispatch = useModalDispatch();
  const timetableState = useTimetableState();

  const startIndex = timetableState.timeSlots
    .slice(0, slotIndex)
    .reduce((acc, slot) => acc + slot.courses.length, 0);

  const handleDeleteCourseClick = () => {
    timetableDispatch({
      type: "DELETE_COURSE",
      payload: { slotIndex, courseId },
    });
  };

  const handleUpdateCourseTime = (
    timeType: "startTime" | "endTime",
    hour: string,
    minute: string,
  ) => {
    timetableDispatch({
      type: "UPDATE_COURSE_TIME",
      payload: { slotIndex, courseId, timeType, time: { hour, minute } },
    });
  };

  const openConfirmModal = (courseNumber: number) => {
    modalDispatch({
      type: "SHOW_MODAL",
      payload: {
        message: `${courseNumber}교시를 삭제 하시겠습니까?`,
        label: "삭제",
        onClick: handleDeleteCourseClick,
      },
    });
  };

  return (
    <li className="py-3">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2 gap-2">
          <div className="text-sm">{startIndex + courseNumber}교시</div>
          <TimeInput
            {...startTime}
            onTimeChange={(hour, minute) =>
              handleUpdateCourseTime("startTime", hour, minute)
            }
          />
          <span className="flex items-center">~</span>
          <TimeInput
            {...endTime}
            onTimeChange={(hour, minute) =>
              handleUpdateCourseTime("endTime", hour, minute)
            }
          />
          <Button
            label="삭제"
            onClick={() => openConfirmModal(startIndex + courseNumber)}
            buttonSize="btn-sm"
            buttonType="btn-red"
          />
        </div>
      </div>
    </li>
  );
}
