import { TimetableState } from "../state/stateTypes";
import { TimeSlot } from "../types";

export const CLASS_NAME = "Class 1";
export const MAX_COURSES = 5;

/**
 * 수업 ID를 통해 교시 정보를 얻는 함수
 * @param timeSlots
 * @param targetId 수업 ID
 * @returns 교시 정보 (3교시일 경우 3 반환)
 */
export const findCourseIndex = (
  timeSlots: TimeSlot[],
  targetId: string,
): number => {
  let totalIndex = 1;

  for (const timeSlot of timeSlots) {
    for (let i = 0; i < timeSlot.courses.length; i++) {
      if (timeSlot.courses[i].id === targetId) {
        return totalIndex + i;
      }
    }
    totalIndex += timeSlot.courses.length;
  }

  return -1;
};

/**
 * 한 시간대에 최대 5개의 교시가 있을 때, 마지막 교시 삭제 시 다음 시간대의 첫 교시 수업을 앞으로 옮기는 함수
 * @param slotIndex 시간대 index
 * @param timetable
 * @returns
 */
export const shiftCourseEarlier = (
  slotIndex: number,
  timetable: TimetableState,
): TimetableState => {
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
};
