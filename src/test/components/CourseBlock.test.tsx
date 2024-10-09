import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import CourseBlock, {
  CourseBlockProps,
} from "../../components/Timetable/CourseBlock";
import { TimeInputProps } from "../../components/Common/TimeInput";

import useTimetableState from "../../hooks/useTimetableState";
import useTimetableDispatch from "../../hooks/useTimetableDispatch";
import useModalDispatch from "../../hooks/useModalDispatch";
import useAlertDispatch from "../../hooks/useAlertDispatch";

import { TimetableState } from "../../state/stateTypes";

vi.mock("../../hooks/useTimetableState");
vi.mock("../../hooks/useTimetableDispatch");
vi.mock("../../hooks/useModalDispatch");
vi.mock("../../hooks/useAlertDispatch");

vi.mock("../../components/Common/TimeInput", () => ({
  default: ({ hour, minute, onTimeChange }: TimeInputProps) => (
    <div data-testid="input-time">
      <input
        data-testid="input-hour"
        value={hour}
        onChange={(e) => onTimeChange(e.target.value, minute)}
      />
      <input
        data-testid="input-minute"
        value={minute}
        onChange={(e) => onTimeChange(hour, e.target.value)}
      />
    </div>
  ),
}));

describe("CourseBlock 컴포넌트", () => {
  const mockTimetableState: TimetableState = {
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
  const mockTimetableDispatch = vi.fn();
  const mockModalDispatch = vi.fn();
  const mockAlertDispatch = vi.fn();

  const courseBlockProps: CourseBlockProps = {
    slotIndex: 1,
    courseId: "course1",
    courseNumber: 1,
    startTime: { hour: "10", minute: "00" },
    endTime: { hour: "11", minute: "00" },
  };

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useTimetableState).mockReturnValue(mockTimetableState);
    vi.mocked(useTimetableDispatch).mockReturnValue(mockTimetableDispatch);
    vi.mocked(useModalDispatch).mockReturnValue(mockModalDispatch);
    vi.mocked(useAlertDispatch).mockReturnValue(mockAlertDispatch);
  });

  test("1교시에 CourseBlock 컴포넌트가 렌더링된다.", () => {
    render(<CourseBlock {...courseBlockProps} />);

    expect(screen.getByText("1교시")).toBeInTheDocument();
    expect(screen.getAllByTestId("input-time")).toHaveLength(2);
    expect(screen.getByText("삭제")).toBeInTheDocument();
  });

  test("시작 시간 변경 시 timetableDispatch가 호출된다.", () => {
    render(<CourseBlock {...courseBlockProps} />);

    const hourInput = screen.getAllByTestId("input-hour")[0];
    fireEvent.change(hourInput, { target: { value: "09" } });

    expect(mockTimetableDispatch).toHaveBeenCalledWith({
      type: "UPDATE_COURSE_TIME",
      payload: {
        slotIndex: 1,
        courseId: "course1",
        timeType: "startTime",
        time: { hour: "09", minute: "00" },
      },
    });
  });

  test("종료 시간 변경 시 timetableDispatch가 호출된다.", () => {
    render(<CourseBlock {...courseBlockProps} />);

    const minuteInput = screen.getAllByTestId("input-minute")[1];
    fireEvent.change(minuteInput, { target: { value: "30" } });

    expect(mockTimetableDispatch).toHaveBeenCalledWith({
      type: "UPDATE_COURSE_TIME",
      payload: {
        slotIndex: 1,
        courseId: "course1",
        timeType: "endTime",
        time: { hour: "11", minute: "30" },
      },
    });
  });

  test("삭제 버튼 클릭 시 확인 모달이 표시된다.", () => {
    render(<CourseBlock {...courseBlockProps} />);

    fireEvent.click(screen.getByText("삭제"));

    expect(mockModalDispatch).toHaveBeenCalledWith({
      type: "SHOW_MODAL",
      payload: {
        message: "1교시를 삭제 하시겠습니까?",
        label: "삭제",
        onClick: expect.any(Function),
      },
    });
  });

  test("시작 시간이 종료 시간보다 늦을 때 alert 메시지가 표시된다.", () => {
    render(<CourseBlock {...courseBlockProps} />);

    const hourInput = screen.getAllByTestId("input-hour")[0];
    fireEvent.change(hourInput, { target: { value: "12" } });

    expect(mockAlertDispatch).toHaveBeenCalledWith({
      type: "SHOW_ALERT",
      payload: { message: "시작 시간은 종료 시간 이전이여야 합니다." },
    });
  });

  test("종료 시간이 시작 시간보다 빠를 때 alert 메시지가 표시된다.", () => {
    render(<CourseBlock {...courseBlockProps} />);

    const hourInput = screen.getAllByTestId("input-hour")[1];
    fireEvent.change(hourInput, { target: { value: "09" } });

    expect(mockAlertDispatch).toHaveBeenCalledWith({
      type: "SHOW_ALERT",
      payload: { message: "종료 시간은 시작 시간 이후여야 합니다." },
    });
  });
});
