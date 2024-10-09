import Button from "../Common/Button";
import TimeInput from "../Common/TimeInput";

import useTimetableDispatch from "../../hooks/useTimetableDispatch";
import useTimetableState from "../../hooks/useTimetableState";
import useModalDispatch from "../../hooks/useModalDispatch";
import useAlertDispatch from "../../hooks/useAlertDispatch";

import { TimeRange } from "../../types";

export type CourseBlockProps = {
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
  const timetableState = useTimetableState();
  const timetableDispatch = useTimetableDispatch();
  const modalDispatch = useModalDispatch();
  const alertDispatch = useAlertDispatch();

  const courseStartIndex = timetableState.timeSlots
    .slice(0, slotIndex)
    .reduce((acc, slot) => acc + slot.courses.length, 0);

  const handleDeleteCourseClick = () => {
    timetableDispatch({
      type: "DELETE_COURSE",
      payload: { slotIndex, courseId },
    });
  };

  const handleUpdateCourseStartTime = (hour: string, minute: string) => {
    if (
      endTime.hour + endTime.minute !== "0000" &&
      hour + minute > endTime.hour + endTime.minute
    ) {
      alertDispatch({
        type: "SHOW_ALERT",
        payload: { message: "시작 시간은 종료 시간 이전이여야 합니다." },
      });
    }

    timetableDispatch({
      type: "UPDATE_COURSE_TIME",
      payload: {
        slotIndex,
        courseId,
        timeType: "startTime",
        time: { hour, minute },
      },
    });
  };

  const handleUpdateCourseEndTime = (hour: string, minute: string) => {
    if (startTime.hour + startTime.minute > hour + minute) {
      alertDispatch({
        type: "SHOW_ALERT",
        payload: { message: "종료 시간은 시작 시간 이후여야 합니다." },
      });
    }

    timetableDispatch({
      type: "UPDATE_COURSE_TIME",
      payload: {
        slotIndex,
        courseId,
        timeType: "endTime",
        time: { hour, minute },
      },
    });
  };

  const openConfirmModal = (courseNum: number) => {
    modalDispatch({
      type: "SHOW_MODAL",
      payload: {
        message: `${courseNum}교시를 삭제 하시겠습니까?`,
        label: "삭제",
        onClick: handleDeleteCourseClick,
      },
    });
  };

  return (
    <li className="py-3">
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="text-sm">{courseStartIndex + courseNumber}교시</div>
          <TimeInput
            {...startTime}
            onTimeChange={(hour, minute) =>
              handleUpdateCourseStartTime(hour, minute)
            }
          />
          <span className="flex items-center">~</span>
          <TimeInput
            {...endTime}
            onTimeChange={(hour, minute) =>
              handleUpdateCourseEndTime(hour, minute)
            }
          />
          <Button
            label="삭제"
            buttonSize="btn-sm"
            buttonType="btn-red"
            onClick={() => openConfirmModal(courseStartIndex + courseNumber)}
          />
        </div>
      </div>
    </li>
  );
}
