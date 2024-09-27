import { TimetableAction, TimetableState } from "./stateTypes";

const MAX_COURSES = 5;

export default function reducer(
  state: TimetableState,
  action: TimetableAction,
): TimetableState {
  switch (action.type) {
    case "UPDATE_BREAK_TIME": {
      const { breakType, timeType, time } = action.payload;

      return {
        ...state,
        breakTime: {
          ...state.breakTime,
          [breakType]: {
            ...state.breakTime[breakType],
            [timeType]: time,
          },
        },
      };
    }
    case "ADD_COURSE": {
      const { slotIndex } = action.payload;

      return {
        ...state,
        timeSlots: state.timeSlots.map((slot, index) => {
          if (index !== slotIndex) return slot;

          const newCourses = [
            ...slot.courses,
            {
              id: crypto.randomUUID(),
              startTime: { hour: "00", minute: "00" },
              endTime: { hour: "00", minute: "00" },
            },
          ];

          return {
            ...slot,
            courses: newCourses,
          };
        }),
      };
    }
    case "DELETE_COURSE": {
      const { slotIndex, courseId } = action.payload;
      const courseIndex = state.timeSlots[slotIndex].courses.findIndex(
        ({ id }) => id === courseId,
      );

      const result = {
        ...state,
        timeSlots: state.timeSlots.map((slot, index) => {
          if (index !== slotIndex) return slot;

          const newCourses = slot.courses.filter(
            (course) => course.id !== courseId,
          );

          return { ...slot, courses: newCourses };
        }),
      };

      if (courseIndex === MAX_COURSES - 1) {
        return shiftCourseEarlier(slotIndex, result);
      }

      return result;
    }
    case "UPDATE_COURSE_TIME": {
      const { timeType, time, slotIndex, courseId } = action.payload;

      const newTimeSlots = state.timeSlots.map((slot, index) => {
        if (index !== slotIndex) return slot;

        const newCourses = slot.courses.map((course) => {
          if (course.id !== courseId) return course;

          return { ...course, [timeType]: time };
        });

        return { ...slot, courses: newCourses };
      });

      return { ...state, timeSlots: newTimeSlots };
    }
    default:
      return state;
  }
}

function shiftCourseEarlier(
  slotIndex: number,
  timetable: TimetableState,
): TimetableState {
  const { timeSlots } = timetable;

  const isLastSlot = slotIndex >= timeSlots.length - 1;
  const isFullSlotList = timeSlots[slotIndex].courses.length >= MAX_COURSES - 1;

  if (isLastSlot || !isFullSlotList) return timetable;

  const nextSlot = timeSlots[slotIndex + 1];

  if (nextSlot.courses.length === 0) return timetable;

  const [nextFirstCourse, ...nextRemainingCourses] = nextSlot.courses;

  const newTimeSlots = timeSlots.map((slot, index) => {
    if (index === slotIndex) {
      return { ...slot, courses: [...slot.courses, nextFirstCourse] };
    } else if (index === slotIndex + 1) {
      return { ...slot, courses: nextRemainingCourses };
    } else {
      return slot;
    }
  });

  const newTimetable = {
    ...timetable,
    timeSlots: newTimeSlots,
  };

  return shiftCourseEarlier(slotIndex + 1, newTimetable);
}
