import Button from "../Common/Button";
import TimeInput from "../Common/TimeInput";

import useTimetableDispatch from "../../hooks/useTimetableDispatch";
import useTimetableState from "../../hooks/useTimetableState";
import useModalDispatch from "../../hooks/useModalDispatch";
import useAlertDispatch from "../../hooks/useAlertDispatch";

import { CourseBlockProps } from "../../types";

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

  const handleUpdateCourseTime = (
    timeType: "startTime" | "endTime",
    hour: string,
    minute: string,
  ) => {
    if (
      timeType === "startTime" &&
      endTime.hour + endTime.minute !== "0000" &&
      hour + minute > endTime.hour + endTime.minute
    ) {
      alertDispatch({
        type: "SHOW_ALERT",
        payload: { message: "시작 시간은 종료 시간 이전이여야 합니다." },
      });
    }

    if (
      timeType === "endTime" &&
      startTime.hour + startTime.minute > hour + minute
    ) {
      alertDispatch({
        type: "SHOW_ALERT",
        payload: { message: "종료 시간은 시작 시간 이후여야 합니다." },
      });
    }

    timetableDispatch({
      type: "UPDATE_COURSE_TIME",
      payload: { slotIndex, courseId, timeType, time: { hour, minute } },
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
        <div className="flex justify-between items-center mb-2 gap-2">
          <div className="text-sm">{courseStartIndex + courseNumber}교시</div>
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
            buttonSize="btn-sm"
            buttonType="btn-red"
            onClick={() => openConfirmModal(courseStartIndex + courseNumber)}
          />
        </div>
      </div>
    </li>
  );
}
