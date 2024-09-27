import { MAX_COURSES, shiftCourseEarlier } from "../utils/course";
import { getTimeAfterMinutes } from "../utils/date";

import { TimetableAction, TimetableState } from "./stateTypes";

export default function reducer(
  state: TimetableState,
  action: TimetableAction,
): TimetableState {
  switch (action.type) {
    case "SET_TIMETABLE": {
      const { timetable } = action.payload;
      return timetable;
    }
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
      const { lunchTime, dinnerTime } = state.breakTime;

      let startTime = {
        hour: "00",
        minute: "00",
      };

      const courses = state.timeSlots[slotIndex].courses;
      if (courses.length > 0) {
        const lastCourse = courses[courses.length - 1];
        startTime = getTimeAfterMinutes(lastCourse.endTime, 10);
      } else {
        if (slotIndex === 1) {
          startTime = lunchTime.endTime;
        } else if (slotIndex === 2) {
          startTime = dinnerTime.endTime;
        }
      }

      const endTime = getTimeAfterMinutes(startTime, 50);

      return {
        ...state,
        timeSlots: state.timeSlots.map((slot, index) => {
          if (index !== slotIndex) return slot;

          const newCourses = [
            ...slot.courses,
            {
              id: crypto.randomUUID(),
              startTime: { hour: startTime.hour, minute: startTime.minute },
              endTime: { hour: endTime.hour, minute: endTime.minute },
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
