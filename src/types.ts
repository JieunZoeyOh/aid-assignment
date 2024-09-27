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

export type ValidationMessage = {
  courseId: string;
  message: string;
};

export type ButtonProps = {
  label: string;
  onClick: () => void;
  isWidthFull?: boolean;
  isDisabled?: boolean;
  buttonType?: "btn-blue" | "btn-red" | "btn-light" | "btn-black";
  buttonSize?: "btn-base" | "btn-sm";
};

export type TimeInputProps = {
  onTimeChange: (hour: string, minute: string) => void;
} & Time;

export type BreakTimeProps = {
  label: string;
  breakTimeType: keyof BreakTime;
};

export type CourseBlockProps = {
  slotIndex: number;
  courseId: string;
  courseNumber: number;
} & TimeRange;

export type TimeSlotProps = {
  slotIndex: number;
  name: string;
  description: string;
  courses: Course[];
};
