import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import App from "./App.tsx";
import NotFound from "./pages/NotFound.tsx";
import ModalProvider from "./contexts/ModalProvider.tsx";
import TimetableProvider from "./contexts/TimetableProvider.tsx";
import AlertProvider from "./contexts/AlertProvider.tsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/timetable" replace />,
  },
  {
    path: "/timetable",
    element: (
      <ModalProvider>
        <AlertProvider>
          <TimetableProvider>
            <App />
          </TimetableProvider>
        </AlertProvider>
      </ModalProvider>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
