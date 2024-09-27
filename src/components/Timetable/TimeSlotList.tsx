import TimeSlot from "./TimeSlot";

import useTimeableState from "../../hooks/useTimetableState";

export default function TimeSlotList() {
  const state = useTimeableState();

  return (
    <div className="justify-items-center items-start grid grid-cols-1 my-2 lg:grid-cols-3 gap-2">
      {state.timeSlots.map((timeSlot, index) => (
        <TimeSlot
          key={index}
          slotIndex={index}
          name={timeSlot.period}
          description={
            index === 0
              ? `~${state.breakTime.lunchTime.startTime.hour}:${state.breakTime.lunchTime.startTime.minute}`
              : index === 1
                ? `${state.breakTime.lunchTime.endTime.hour}:${state.breakTime.lunchTime.endTime.minute}~`
                : `${state.breakTime.dinnerTime.endTime.hour}:${state.breakTime.dinnerTime.endTime.minute}~`
          }
          courses={timeSlot.courses}
        />
      ))}
    </div>
  );
}
