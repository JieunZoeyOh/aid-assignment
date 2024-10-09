import { beforeEach, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import Button, { ButtonProps } from "../../components/Common/Button";

describe("Button 컴포넌트", () => {
  const mockOnClick = vi.fn();
  const buttonProps: ButtonProps = {
    label: "확인",
    onClick: mockOnClick,
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("사용자 정의 버튼 텍스트가 렌더링된다.", () => {
    render(<Button {...buttonProps} />);

    const button = screen.getByText("확인");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn-light", "btn-base");
  });

  test("버튼 클릭 시 onClick이 호출된다.", () => {
    render(<Button {...buttonProps} />);

    const button = screen.getByText("확인");
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });

  test("비활성 화 된 버튼은 클릭 시 onClick이 호출되지 않는다.", () => {
    render(<Button {...buttonProps} isDisabled />);

    const button = screen.getByText("확인");
    fireEvent.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  test("isWidthFull이 true일 경우 width가 100%이다.", () => {
    render(<Button {...buttonProps} isWidthFull />);

    const button = screen.getByText("확인");
    expect(button).toHaveClass("w-full");
  });
});
