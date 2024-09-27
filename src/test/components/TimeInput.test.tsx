import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import TimeInput from "../../components/Common/TimeInput";

import { TimeInputProps } from "../../types";

describe("TimeInput 컴포넌트", () => {
  const mockOnTimeChange = vi.fn();
  const timeInputProps: TimeInputProps = {
    hour: "12",
    minute: "41",
    onTimeChange: mockOnTimeChange,
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("props로 넘겨준 시간과 분이 선택되어 있다.", () => {
    render(<TimeInput {...timeInputProps} />);

    const hourSelectBox = screen.getAllByRole("combobox")[0];
    const hourOptions = hourSelectBox.querySelectorAll("option");

    const minuteSelectBox = screen.getAllByRole("combobox")[1];
    const minuteOptions = minuteSelectBox.querySelectorAll("option");

    expect(hourOptions[12].selected).toBeTruthy();
    expect(minuteOptions[41].selected).toBeTruthy();
  });

  test("TimeSelect를 선택하면 onTimeChange가 호출된다.", () => {
    render(<TimeInput {...timeInputProps} />);

    const hourSelectBox = screen.getAllByRole("combobox")[0];
    fireEvent.change(hourSelectBox, { target: { value: "14" } });

    const minuteSelectBox = screen.getAllByRole("combobox")[1];
    fireEvent.change(minuteSelectBox, { target: { value: "40" } });

    expect(mockOnTimeChange).toHaveBeenCalledTimes(2);
  });

  test("0시부터 23시까지 선택할 수 있다.", () => {
    render(<TimeInput {...timeInputProps} />);

    const hourSelectBox = screen.getAllByRole("combobox")[0];
    const hourOptions = hourSelectBox.querySelectorAll("option");

    expect(hourOptions).toHaveLength(24);
    expect(hourOptions[0]).toHaveValue("00");
    expect(hourOptions[23]).toHaveValue("23");
  });

  test("0분부터 59분까지 선택할 수 있다.", () => {
    render(<TimeInput {...timeInputProps} />);

    const minuteSelectBox = screen.getAllByRole("combobox")[1];
    const minuteOptions = minuteSelectBox.querySelectorAll("option");

    expect(minuteOptions).toHaveLength(60);
    expect(minuteOptions[0]).toHaveValue("00");
    expect(minuteOptions[59]).toHaveValue("59");
  });
});
