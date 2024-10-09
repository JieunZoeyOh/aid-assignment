import TimeSlot from "./TimeSlot";

import useTimeableState from "../../hooks/useTimetableState";

import { TimetableState } from "../../contexts/stateTypes";

export default function TimeSlotList() {
  const state = useTimeableState();

  return (
    <div className="justify-items-center items-start grid grid-cols-1 my-2 lg:grid-cols-3 gap-2">
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
}

function getDescription(index: number, state: TimetableState): string {
  if (index === 0) {
    return `~${state.breakTime.lunchTime.startTime.hour}:${state.breakTime.lunchTime.startTime.minute}`;
  } else if (index === 1) {
    return `${state.breakTime.lunchTime.endTime.hour}:${state.breakTime.lunchTime.endTime.minute}~`;
  } else {
    return `${state.breakTime.dinnerTime.endTime.hour}:${state.breakTime.dinnerTime.endTime.minute}~`;
  }
}
