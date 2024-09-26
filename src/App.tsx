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

  const [lunchTime, setLunchTime] = useState({
    startTime: { hour: "00", minute: "00" },
    endTime: { hour: "00", minute: "00" },
  });
  const [dinnerTime, setDinnerTime] = useState({
    startTime: { hour: "00", minute: "00" },
    endTime: { hour: "00", minute: "00" },
  });

  const handleLunchStartTimeChange = (hour: string, minute: string) => {
    setLunchTime((prev) => ({
      ...prev,
      startTime: { hour, minute },
    }));
  };

  const handleLunchEndTimeChange = (hour: string, minute: string) => {
    setLunchTime((prev) => ({
      ...prev,
      endTime: { hour, minute },
    }));
  };

  const handleDinnerStartTimeChange = (hour: string, minute: string) => {
    setDinnerTime((prev) => ({
      ...prev,
      startTime: { hour, minute },
    }));
  };

  const handleDinnerEndTimeChange = (hour: string, minute: string) => {
    setDinnerTime((prev) => ({
      ...prev,
      endTime: { hour, minute },
    }));
  };

  return (
    <>
      <div className="flex justify-center mb-20">
        <div className="w-full md:w-11/12 xl:w-4/5">
          <ClassGroupSetting />
          <ClassGroupList />
          <TimeSlotList />
          <div className="gap-4 py-6 lg:flex">
            <BreakTime
              label="점심"
              breakTime={lunchTime}
              onStartTimeChange={handleLunchStartTimeChange}
              onEndTimeChange={handleLunchEndTimeChange}
            />
            <BreakTime
              label="저녁"
              breakTime={dinnerTime}
              onStartTimeChange={handleDinnerStartTimeChange}
              onEndTimeChange={handleDinnerEndTimeChange}
            />
          </div>
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
