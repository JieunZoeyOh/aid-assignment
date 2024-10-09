import { BreakTime, Time, TimeSlot } from "../types";

export type TimetableState = {
  breakTime: BreakTime;
  timeSlots: TimeSlot[];
};

export type ModalState = {
  message: string;
  label: string;
  onClick: () => void;
};

export type AlertState = {
  message: string;
};

export type TimetableAction =
  | {
      type: "SET_TIMETABLE";
      payload: {
        timetable: TimetableState;
      };
    }
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

export type AlertAction =
  | {
      type: "SHOW_ALERT";
      payload: { message: string };
    }
  | {
      type: "CLOSE_ALERT";
    };
