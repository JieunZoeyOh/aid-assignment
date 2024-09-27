import { beforeEach, describe, expect, Mock, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import Modal from "../../components/Common/Modal";

import useModalState from "../../hooks/useModalState";
import useModalDispatch from "../../hooks/useModalDispatch";
import { ModalState } from "../../state/stateTypes";

vi.mock("../../hooks/useModalState");
vi.mock("../../hooks/useModalDispatch");

describe("Modal 컴포넌트", () => {
  const mockOnClick = vi.fn();
  const mockState: ModalState = {
    message: "Modal Test Message",
    label: "확인",
    onClick: mockOnClick,
  };

  const mockDispatch = vi.fn();

  beforeEach(() => {
    (useModalState as Mock).mockReturnValue(mockState);
    (useModalDispatch as Mock).mockReturnValue(mockDispatch);
  });

  test("사용자 정의 버튼 텍스트와 메시지가 렌더링된다.", () => {
    render(<Modal />);

    expect(screen.getByText("Modal Test Message")).toBeInTheDocument();
    expect(screen.getByText("확인")).toBeInTheDocument();
    expect(screen.getByText("취소")).toBeInTheDocument();
  });

  test("취소 버튼 클릭 시 모달이 닫힌다.", () => {
    render(<Modal />);

    const cancelButton = screen.getByText("취소");
    fireEvent.click(cancelButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "CLOSE_MODAL" });
  });

  test("확인 버튼 클릭 시 modalState의 onClick이 호출된다.", () => {
    render(<Modal />);

    const confirmButton = screen.getByText("확인");
    fireEvent.click(confirmButton);

    expect(mockOnClick).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({ type: "CLOSE_MODAL" });
  });
});
