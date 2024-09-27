import { timeToMinutes } from "./date";

import { TimetableState } from "../state/stateTypes";
import { Course, Time, TimeRange, ValidationMessage } from "../types";

/**
 * 두 교시의 시간이 겹치는지 확인하는 함수
 * @param course1
 * @param course2
 * @returns
 */
const isConflict = (course1: TimeRange, course2: TimeRange): boolean => {
  const course1End = timeToMinutes(course1.endTime);
  const course2Start = timeToMinutes(course2.startTime);
  return course2Start < course1End;
};

/**
 * 유효하지 않는 수업을 반환하는 확인하는 함수
 * - 시간대 내에 시간이 있지 않은 경우
 * - 수업 종료 시간이 시작 시간보다 빠른 경우
 * @param courses
 * @param startTime
 * @param endTime
 * @returns
 */
const getInvalidCoursesInTimeSlot = (
  courses: Course[],
  startTime: Time,
  endTime: Time,
): Course | undefined => {
  return courses.find((course) => {
    const courseStartMinutes = timeToMinutes(course.startTime);
    const courseEndMinutes = timeToMinutes(course.endTime);
    const slotStartMinutes = timeToMinutes(startTime);
    const slotEndMinutes = timeToMinutes(endTime);

    return (
      courseStartMinutes < slotStartMinutes ||
      slotEndMinutes < courseEndMinutes ||
      courseEndMinutes <= courseStartMinutes
    );
  });
};

/**
 * 다른 수업과 시간이 겹치는 수업을 반환하는 함수
 * @param courses
 * @returns
 */
const findConflictCourse = (courses: Course[]): Course | undefined => {
  for (let i = 0; i < courses.length - 1; i++) {
    const currentCourse = courses[i];
    const nextCourse = courses[i + 1];

    if (isConflict(currentCourse, nextCourse)) {
      return currentCourse;
    }
  }
};

/**
 * 시간표 유효성 검사 함수
 * @param timetable
 * @returns 유효하지 않은 수업의 ID와 메시지
 */
const validateTimetable = (
  timetable: TimetableState,
): ValidationMessage | null => {
  const timeSlotRanges = [
    {
      startTime: { hour: "00", minute: "00" },
      endTime: timetable.breakTime.lunchTime.startTime,
    },
    {
      startTime: timetable.breakTime.lunchTime.endTime,
      endTime: timetable.breakTime.dinnerTime.startTime,
    },
    {
      startTime: timetable.breakTime.dinnerTime.endTime,
      endTime: { hour: "23", minute: "59" },
    },
  ];

  for (let i = 0; i < timetable.timeSlots.length; i++) {
    const courses = [...timetable.timeSlots[i].courses].sort(
      (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime),
    );

    const invalidCourses = getInvalidCoursesInTimeSlot(
      courses,
      timeSlotRanges[i].startTime,
      timeSlotRanges[i].endTime,
    );

    if (invalidCourses) {
      return {
        courseId: invalidCourses.id,
        message: "수업 시간 범위를 확인해 주세요.",
      };
    }

    const conflictCourses = findConflictCourse(courses);

    if (conflictCourses) {
      return {
        courseId: conflictCourses.id,
        message: "수업이 다른 수업 시간과 겹칩니다.",
      };
    }
  }

  return null;
};

export default validateTimetable;
