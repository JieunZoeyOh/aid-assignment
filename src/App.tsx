import { useReducer, useState } from "react";

import TimeSlotList from "./components/Timetable/TimeSlotList";
import BreakTime from "./components/Timetable/BreakTime";
import Modal from "./components/Common/Modal";
import Alert from "./components/Common/Alert";
import Button from "./components/Common/Button";

import timetableReducer from "./state/timetableReducer";
import modalReducer from "./state/modalReducer";
import timetableInitialState from "./state/timetableInitialState";
import modalInitialState from "./state/modalInitialState";
import {
  TimetableDispatchContext,
  TimetableStateContext,
} from "./contexts/TimetableContext";
import {
  ModalDispatchContext,
  ModalStateContext,
} from "./contexts/ModalContext";

export default function App() {
  const [timetableState, timetableDispatch] = useReducer(
    timetableReducer,
    timetableInitialState,
  );
  const [modalState, modalDispatch] = useReducer(
    modalReducer,
    modalInitialState,
  );
  const [alertMessagae, setAlertMessage] = useState<string | null>(null);

  return (
    <ModalStateContext.Provider value={modalState}>
      <ModalDispatchContext.Provider value={modalDispatch}>
        <div>
          <TimetableStateContext.Provider value={timetableState}>
            <TimetableDispatchContext.Provider value={timetableDispatch}>
              <div className="flex justify-center mb-20">
                <div className="w-full md:w-11/12 xl:w-4/5">
                  <div className="flex justify-end py-2">
                    <Button
                      label="시간표 저장"
                      onClick={() => {}}
                      buttonType="btn-blue"
                    />
                  </div>
                  <nav className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
                    <ul className="flex flex-wrap">
                      <li className="me-2">
                        <button className="inline-block p-4 border-b-2 rounded-t-lg border-rose-600 text-rose-600">
                          <span>Class 1</span>
                        </button>
                      </li>
                    </ul>
                  </nav>
                  <TimeSlotList />
                  <div className="gap-4 py-6 lg:flex">
                    <BreakTime label="점심" breakTimeType="lunchTime" />
                    <BreakTime label="저녁" breakTimeType="dinnerTime" />
                  </div>
                </div>
              </div>
            </TimetableDispatchContext.Provider>
          </TimetableStateContext.Provider>
          {modalState.message && <Modal />}
          {alertMessagae && (
            <Alert
              message={alertMessagae}
              clearMessage={() => setAlertMessage(null)}
            />
          )}
        </div>
      </ModalDispatchContext.Provider>
    </ModalStateContext.Provider>
  );
}
