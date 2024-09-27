export type Time = {
  hour: string;
  minute: string;
};

export type TimeRange = {
  startTime: Time;
  endTime: Time;
};

export type BreakTime = {
  lunchTime: TimeRange;
  dinnerTime: TimeRange;
};

export type Course = {
  id: string;
} & TimeRange;

export type TimeSlot = {
  period: "오전" | "오후" | "저녁";
  courses: Course[];
};

export type ClassBasicInfo = {
  id: string;
  name: string;
};

export type Class = {
  breakTime: BreakTime;
  timeSlots: TimeSlot[];
} & ClassBasicInfo;
