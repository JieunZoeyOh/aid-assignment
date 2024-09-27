import { useEffect } from "react";

import Header from "./components/Common/Header";
import TimeSlotList from "./components/Timetable/TimeSlotList";
import BreakTime from "./components/Timetable/BreakTime";
import Modal from "./components/Common/Modal";
import Alert from "./components/Common/Alert";

import useTimetableDispatch from "./hooks/useTimetableDispatch";
import useModalState from "./hooks/useModalState";
import useAlertState from "./hooks/useAlertState";
import useAlertDispatch from "./hooks/useAlertDispatch";

import { CLASS_NAME } from "./utils/course";

export default function App() {
  const timetableDispatch = useTimetableDispatch();
  const modalState = useModalState();
  const alertState = useAlertState();
  const alertDispatch = useAlertDispatch();

  useEffect(() => {
    try {
      const data = localStorage.getItem(CLASS_NAME);

      if (data) {
        const timetable = JSON.parse(data);
        timetableDispatch({ type: "SET_TIMETABLE", payload: { timetable } });
      }
    } catch (error) {
      alertDispatch({
        type: "SHOW_ALERT",
        payload: { message: "데이터를 불러오는 데 문제가 발생했습니다." },
      });
      console.error(error);
    }
  }, [timetableDispatch, alertDispatch]);

  return (
    <div className="relative">
      <div className="flex justify-center mb-20">
        <div className="w-full md:w-11/12 xl:w-4/5">
          <Header />
          <nav className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
            <ul className="flex flex-wrap">
              <li className="me-2">
                <button className="inline-block p-4 border-b-2 rounded-t-lg border-rose-600 text-rose-600">
                  <span>{CLASS_NAME}</span>
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
      {modalState.message && <Modal />}
      {alertState.message && <Alert />}
    </div>
  );
}
