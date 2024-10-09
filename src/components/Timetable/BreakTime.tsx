import { memo } from "react";

import TimeInput from "../Common/TimeInput";

import useTimetableState from "../../hooks/useTimetableState";
import useTimetableDispatch from "../../hooks/useTimetableDispatch";
import useAlertDispatch from "../../hooks/useAlertDispatch";

import { BreakTime as BreakTimeType } from "../../types";

export type BreakTimeProps = {
  label: string;
  breakTimeType: keyof BreakTimeType;
};

const BreakTime = memo(function BreakTime({
  label,
  breakTimeType,
}: BreakTimeProps) {
  const timetableState = useTimetableState();
  const timetableDispatch = useTimetableDispatch();
  const alertDispatch = useAlertDispatch();

  const breakTime = timetableState.breakTime[breakTimeType];

  const handleBreakStartTimeChange = (hour: string, minute: string) => {
    const { endTime } = breakTime;

    if (hour + minute > endTime.hour + endTime.minute) {
      alertDispatch({
        type: "SHOW_ALERT",
        payload: { message: "시작 시간은 종료 시간 이전이여야 합니다." },
      });
    }

    timetableDispatch({
      type: "UPDATE_BREAK_TIME",
      payload: {
        breakType: breakTimeType,
        timeType: "startTime",
        time: { hour, minute },
      },
    });
  };

  const handleBreakEndTimeChange = (hour: string, minute: string) => {
    const { startTime } = breakTime;

    if (startTime.hour + startTime.minute > hour + minute) {
      alertDispatch({
        type: "SHOW_ALERT",
        payload: {
          message: "종료 시간은 시작 시간 이후여야 합니다.",
        },
      });
    }

    timetableDispatch({
      type: "UPDATE_BREAK_TIME",
      payload: {
        breakType: breakTimeType,
        timeType: "endTime",
        time: { hour, minute },
      },
    });
  };

  return (
    <div className="flex items-center justify-center gap-4 pt-2">
      <div className="text-sm">{label}</div>
      <div className="flex flex-wrap items-center min-w-0 text-sm font-medium text-gray-900">
        <TimeInput
          hour={breakTime.startTime.hour}
          minute={breakTime.startTime.minute}
          onTimeChange={(hour, minute) =>
            handleBreakStartTimeChange(hour, minute)
          }
        />
        <span className="flex items-center px-2">~</span>
        <TimeInput
          hour={breakTime.endTime.hour}
          minute={breakTime.endTime.minute}
          onTimeChange={(hour, minute) =>
            handleBreakEndTimeChange(hour, minute)
          }
        />
      </div>
    </div>
  );
});

export default BreakTime;
