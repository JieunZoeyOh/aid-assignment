import TimeInput from "../Common/TimeInput";

import useTimetableState from "../../hooks/useTimetableState";
import useTimetableDispatch from "../../hooks/useTimetableDispatch";

import { BreakTime as BreakTimeType } from "../../types";

type BreakTimeProps = {
  label: string;
  breakTimeType: keyof BreakTimeType;
};

export default function BreakTime({ label, breakTimeType }: BreakTimeProps) {
  const state = useTimetableState();
  const dispatch = useTimetableDispatch();

  const breakTime = state.breakTime[breakTimeType];

  const handleBreakTimeChange = (
    hour: string,
    minute: string,
    timeType: "startTime" | "endTime",
  ) => {
    dispatch({
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
      <div className="flex flex-wrap min-w-0 text-sm font-medium text-gray-900 items-center">
        <TimeInput
          hour={breakTime.startTime.hour}
          minute={breakTime.startTime.minute}
          onTimeChange={(hour, minute) =>
            handleBreakTimeChange(hour, minute, "startTime")
          }
        />
        <span className="px-2 flex items-center">~</span>
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
