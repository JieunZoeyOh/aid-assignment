import { TimetableAction, TimetableState } from "./stateTypes";

export default function reducer(
  state: TimetableState,
  action: TimetableAction,
): TimetableState {
  switch (action.type) {
    case "UPDATE_BREAK_TIME": {
      return {
        ...state,
        breakTime: {
          ...state.breakTime,
          [action.payload.breakType]: {
            ...state.breakTime[action.payload.breakType],
            [action.payload.timeType]: action.payload.time,
          },
        },
      };
    }
    case "ADD_COURSE": {
      const slotIndex = action.payload.slotIndex;

      return {
        ...state,
        timeSlots: state.timeSlots.map((slot, index) =>
          index === slotIndex
            ? {
                ...slot,
                courses: [
                  ...slot.courses,
                  {
                    id: crypto.randomUUID(),
                    startTime: { hour: "00", minute: "00" },
                    endTime: { hour: "00", minute: "00" },
                  },
                ],
              }
            : slot,
        ),
      };
    }
    case "DELETE_COURSE": {
      const slotIndex = action.payload.slotIndex;
      const courseId = action.payload.courseId;

      return {
        ...state,
        timeSlots: state.timeSlots.map((slot, index) =>
          index === slotIndex
            ? {
                ...slot,
                courses: slot.courses.filter(
                  (course) => course.id !== courseId,
                ),
              }
            : slot,
        ),
      };
    }
    case "UPDATE_COURSE_TIME": {
      const slotIndex = action.payload.slotIndex;
      const courseId = action.payload.courseId;

      return {
        ...state,
        timeSlots: state.timeSlots.map((slot, index) =>
          index === slotIndex
            ? {
                ...slot,
                courses: slot.courses.map((course) =>
                  course.id === courseId
                    ? {
                        ...course,
                        [action.payload.timeType]: action.payload.time,
                      }
                    : course,
                ),
              }
            : slot,
        ),
      };
    }
    default:
      return state;
  }
}
