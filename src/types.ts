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

export type TimetableState = {
  breakTime: BreakTime;
  timeSlots: TimeSlot[];
};

export type ModalState = {
  message: string;
  label: string;
  onClick: () => void;
};

export type TimetableAction =
  | {
      type: "UPDATE_BREAK_TIME";
      payload: {
        breakType: keyof BreakTime;
        timeType: "startTime" | "endTime";
        time: Time;
      };
    }
  | { type: "ADD_COURSE"; payload: { slotIndex: number } }
  | { type: "DELETE_COURSE"; payload: { slotIndex: number; courseId: string } }
  | {
      type: "UPDATE_COURSE_TIME";
      payload: {
        slotIndex: number;
        courseId: string;
        timeType: "startTime" | "endTime";
        time: Time;
      };
    };

export type ModalAction =
  | {
      type: "SHOW_MODAL";
      payload: { message: string; label: string; onClick: () => void };
    }
  | {
      type: "CLOSE_MODAL";
    };
