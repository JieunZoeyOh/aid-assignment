import TimeSlotList from "./components/Timetable/TimeSlotList";
import BreakTime from "./components/Timetable/BreakTime";
import Modal from "./components/Common/Modal";
import Alert from "./components/Common/Alert";
import Button from "./components/Common/Button";
import useModalState from "./hooks/useModalState";
import useAlertState from "./hooks/useAlertState";

export default function App() {
  const modalState = useModalState();
  const alertState = useAlertState();

  return (
    <div className="relative">
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
      {modalState.message && <Modal />}
      {alertState.message && <Alert />}
    </div>
  );
}
