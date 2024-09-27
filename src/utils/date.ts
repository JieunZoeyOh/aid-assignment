import { Time } from "../types";

/**
 * 입력받은 분(afterMinutes)을 합한 새로운 time을 반환하는 함수
 * @param time
 * @param afterMinutes
 * @returns
 */
export const getTimeAfterMinutes = (time: Time, afterMinutes: number): Time => {
  const totalMinutes = timeToMinutes(time) + afterMinutes;
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;

  return {
    hour: hour.toString().padStart(2, "0"),
    minute: minute.toString().padStart(2, "0"),
  };
};

/**
 * time 객체를 분으로 변환하는 함수
 * @param time
 * @returns
 */
export const timeToMinutes = (time: Time): number => {
  return parseInt(time.hour, 10) * 60 + parseInt(time.minute, 10);
};

/**
 * 0~23
 */
export const HOURS = new Array(24)
  .fill("0")
  .map((item, index) => index.toString().padStart(2, item));

/**
 * 0~59
 */
export const MINUTES = new Array(60)
  .fill("0")
  .map((item, index) => index.toString().padStart(2, item));
