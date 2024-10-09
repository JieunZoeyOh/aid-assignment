import { memo } from "react";

import TimeSlot from "./TimeSlot";

import useTimeableState from "../../hooks/useTimetableState";

import { TimetableState } from "../../contexts/stateTypes";

const TimeSlotList = memo(function TimeSlotList() {
  const state = useTimeableState();

  return (
    <div className="grid items-start grid-cols-1 gap-2 my-2 justify-items-center lg:grid-cols-3">
      {state.timeSlots.map((timeSlot, index) => (
        <TimeSlot
          key={index}
          slotIndex={index}
          name={timeSlot.period}
          description={getDescription(index, state)}
          courses={timeSlot.courses}
        />
      ))}
    </div>
  );
});

export default TimeSlotList;

function getDescription(index: number, state: TimetableState): string {
  if (index === 0) {
    return `~${state.breakTime.lunchTime.startTime.hour}:${state.breakTime.lunchTime.startTime.minute}`;
  } else if (index === 1) {
    return `${state.breakTime.lunchTime.endTime.hour}:${state.breakTime.lunchTime.endTime.minute}~`;
  } else {
    return `${state.breakTime.dinnerTime.endTime.hour}:${state.breakTime.dinnerTime.endTime.minute}~`;
  }
}
