import { ReactElement } from "react";
import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import App from "../App";
import ModalProvider from "../contexts/ModalProvider";
import AlertProvider from "../contexts/AlertProvider";
import TimetableProvider from "../contexts/TimetableProvider";

type AllTheProvidersType = {
  children: ReactElement;
};

const AllTheProviders = ({ children }: AllTheProvidersType) => {
  return (
    <BrowserRouter>
      <ModalProvider>
        <AlertProvider>
          <TimetableProvider>{children}</TimetableProvider>
        </AlertProvider>
      </ModalProvider>
    </BrowserRouter>
  );
};

test("저장 버튼이 있다.", () => {
  render(
    <AllTheProviders>
      <App />
    </AllTheProviders>,
  );

  expect(screen.getByText("시간표 저장")).toBeInTheDocument();
  expect(screen.getByText("Class 1")).toBeInTheDocument();
});
