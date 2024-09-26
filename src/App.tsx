import { useState } from "react";

import ClassGroupSetting from "./components/Timetable/ClassGroupSetting";
import ClassGroupList from "./components/Timetable/ClassGroupList";
import TimeSlotList from "./components/Timetable/TimeSlotList";
import BreakTime from "./components/Timetable/BreakTime";
import Modal from "./components/Common/Modal";
import Alert from "./components/Common/Alert";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessagae, setAlertMessage] = useState<string | null>(null);

  return (
    <>
      <div className="flex justify-center mb-20">
        <div className="w-full md:w-11/12 xl:w-4/5">
          <ClassGroupSetting />
          <ClassGroupList />
          <TimeSlotList />
          <BreakTime />
        </div>
      </div>
      {isModalOpen && (
        <Modal
          description="1교시를 삭제하시겠습니까?"
          buttonLabel="삭제"
          onCloseClick={() => setIsModalOpen(false)}
        />
      )}
      {alertMessagae && (
        <Alert
          message={alertMessagae}
          clearMessage={() => setAlertMessage(null)}
        />
      )}
    </>
  );
}
