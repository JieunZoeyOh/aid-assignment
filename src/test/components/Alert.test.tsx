import {
  afterEach,
  beforeEach,
  describe,
  expect,
  Mock,
  test,
  vi,
} from "vitest";
import { act, render, screen } from "@testing-library/react";

import Alert from "../../components/Common/Alert";

import useAlertState from "../../hooks/useAlertState";
import useAlertDispatch from "../../hooks/useAlertDispatch";

import { AlertState } from "../../state/stateTypes";

vi.mock("../../hooks/useAlertState");
vi.mock("../../hooks/useAlertDispatch");

describe("Alert 컴포넌트", () => {
  const alertState: AlertState = {
    message: "Alert Test Message",
  };

  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    (useAlertState as Mock).mockReturnValue(alertState);
    (useAlertDispatch as Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("사용자 정의 메시지가 렌더링된다.", () => {
    render(<Alert />);

    expect(screen.getByText("Alert Test Message")).toBeInTheDocument();
  });

  test("2초 후 언마운트 된다.", () => {
    render(<Alert />);

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(mockDispatch).toHaveBeenCalledWith({ type: "CLOSE_ALERT" });
  });
});
