import { TimetableState } from "../types";

const initialState: TimetableState = {
  breakTime: {
    lunchTime: {
      startTime: { hour: "12", minute: "00" },
      endTime: { hour: "13", minute: "00" },
    },
    dinnerTime: {
      startTime: { hour: "18", minute: "00" },
      endTime: { hour: "19", minute: "00" },
    },
  },
  timeSlots: [
    { period: "오전", courses: [] },
    { period: "오후", courses: [] },
    { period: "저녁", courses: [] },
  ],
};

export default initialState;
