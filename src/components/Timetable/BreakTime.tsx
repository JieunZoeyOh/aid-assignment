import TimeInput from "../Common/TimeInput";

import useTimetableState from "../../hooks/useTimetableState";
import useTimetableDispatch from "../../hooks/useTimetableDispatch";
import useAlertDispatch from "../../hooks/useAlertDispatch";

import { BreakTime as BreakTimeType } from "../../types";

export type BreakTimeProps = {
  label: string;
  breakTimeType: keyof BreakTimeType;
};

export default function BreakTime({ label, breakTimeType }: BreakTimeProps) {
  const timetableState = useTimetableState();
  const timetableDispatch = useTimetableDispatch();
  const alertDispatch = useAlertDispatch();

  const breakTime = timetableState.breakTime[breakTimeType];

  const handleBreakTimeChange = (
    hour: string,
    minute: string,
    timeType: "startTime" | "endTime",
  ) => {
    const { startTime, endTime } = breakTime;

    if (timeType === "startTime") {
      if (hour + minute > endTime.hour + endTime.minute) {
        alertDispatch({
          type: "SHOW_ALERT",
          payload: { message: "시작 시간은 종료 시간 이전이여야 합니다." },
        });
      }
    } else {
      if (startTime.hour + startTime.minute > hour + minute) {
        alertDispatch({
          type: "SHOW_ALERT",
          payload: {
            message: "종료 시간은 시작 시간 이후여야 합니다.",
          },
        });
      }
    }

    timetableDispatch({
      type: "UPDATE_BREAK_TIME",
      payload: {
        breakType: breakTimeType,
        timeType,
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
            handleBreakTimeChange(hour, minute, "startTime")
          }
        />
        <span className="flex items-center px-2">~</span>
        <TimeInput
          hour={breakTime.endTime.hour}
          minute={breakTime.endTime.minute}
          onTimeChange={(hour, minute) =>
            handleBreakTimeChange(hour, minute, "endTime")
          }
        />
      </div>
    </div>
  );
}
