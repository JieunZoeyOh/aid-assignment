import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import BreakTime from "../../components/Timetable/BreakTime";

import useTimetableState from "../../hooks/useTimetableState";
import useTimetableDispatch from "../../hooks/useTimetableDispatch";
import useAlertDispatch from "../../hooks/useAlertDispatch";

import { TimeInputProps } from "../../types";
import { TimetableState } from "../../state/stateTypes";

vi.mock("../../hooks/useTimetableState");
vi.mock("../../hooks/useTimetableDispatch");
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

describe("BreakTime 컴포넌트", () => {
  const mockTimetableState: TimetableState = {
    breakTime: {
      lunchTime: {
        startTime: { hour: "11", minute: "30" },
        endTime: { hour: "12", minute: "30" },
      },
      dinnerTime: {
        startTime: { hour: "18", minute: "00" },
        endTime: { hour: "19", minute: "00" },
      },
    },
    timeSlots: [],
  };
  const mockTimetableDispatch = vi.fn();
  const mockAlertDispatch = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(useTimetableState).mockReturnValue(mockTimetableState);
    vi.mocked(useTimetableDispatch).mockReturnValue(mockTimetableDispatch);
    vi.mocked(useAlertDispatch).mockReturnValue(mockAlertDispatch);
  });

  test("컴포넌트가 올바르게 렌더링된다.", () => {
    render(<BreakTime label="점심 시간" breakTimeType="lunchTime" />);

    expect(screen.getByText("점심 시간")).toBeInTheDocument();
    expect(screen.getAllByTestId("input-time")).toHaveLength(2);
  });

  test("시작 시간 변경 시 timetableDispatch가 호출된다", () => {
    render(<BreakTime label="점심 시간" breakTimeType="lunchTime" />);

    const startHourInput = screen.getAllByTestId("input-hour")[0];
    fireEvent.change(startHourInput, { target: { value: "10" } });

    expect(mockTimetableDispatch).toHaveBeenCalledWith({
      type: "UPDATE_BREAK_TIME",
      payload: {
        breakType: "lunchTime",
        timeType: "startTime",
        time: { hour: "10", minute: "30" },
      },
    });
  });

  test("종료 시간 변경 시 timetableDispatch가 호출된다.", () => {
    render(<BreakTime label="점심 시간" breakTimeType="lunchTime" />);

    const endMinuteInput = screen.getAllByTestId("input-minute")[1];
    fireEvent.change(endMinuteInput, { target: { value: "20" } });

    expect(mockTimetableDispatch).toHaveBeenCalledWith({
      type: "UPDATE_BREAK_TIME",
      payload: {
        breakType: "lunchTime",
        timeType: "endTime",
        time: { hour: "12", minute: "20" },
      },
    });
  });

  test("시작 시간이 종료 시간보다 늦을 때 경고가 표시된다.", () => {
    render(<BreakTime label="점심 시간" breakTimeType="lunchTime" />);

    const startHourInput = screen.getAllByTestId("input-hour")[0];
    fireEvent.change(startHourInput, { target: { value: "14" } });

    expect(mockAlertDispatch).toHaveBeenCalledWith({
      type: "SHOW_ALERT",
      payload: { message: "시작 시간은 종료 시간 이전이여야 합니다." },
    });
  });

  test("종료 시간이 시작 시간보다 빠를 때 경고가 표시된다.", () => {
    render(<BreakTime label="점심 시간" breakTimeType="lunchTime" />);

    const endHourInput = screen.getAllByTestId("input-hour")[1];
    fireEvent.change(endHourInput, { target: { value: "10" } });

    expect(mockAlertDispatch).toHaveBeenCalledWith({
      type: "SHOW_ALERT",
      payload: { message: "종료 시간은 시작 시간 이후여야 합니다." },
    });
  });
});
