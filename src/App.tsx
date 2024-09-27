import { useState } from "react";

import ClassGroupList from "./components/Timetable/ClassGroupList";
import TimeSlotList from "./components/Timetable/TimeSlotList";
import BreakTime from "./components/Timetable/BreakTime";
import Modal from "./components/Common/Modal";
import Alert from "./components/Common/Alert";
import Button from "./components/Common/Button";

import { BreakTime as BreakTimeType, TimeSlot, TimeRange } from "./types";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessagae, setAlertMessage] = useState<string | null>(null);

  const [className, setClassName] = useState<string>("Class 1");
  const [breakTime, setBreakTime] = useState<BreakTimeType>({
    lunchTime: {
      startTime: { hour: "12", minute: "00" },
      endTime: { hour: "13", minute: "00" },
    },
    dinnerTime: {
      startTime: { hour: "18", minute: "00" },
      endTime: { hour: "19", minute: "00" },
    },
  });

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { courses: [] },
    { courses: [] },
    { courses: [] },
  ]);

  const handleBreakTimeChange =
    (breakType: keyof BreakTimeType, timeRangeType: keyof TimeRange) =>
    (hour: string, minute: string) => {
      setBreakTime((prev) => ({
        ...prev,
        [breakType]: {
          ...prev[breakType],
          [timeRangeType]: { hour, minute },
        },
      }));
    };

  const handleAddCourseClick = (index: number) => {
    setTimeSlots((prevTimeSlots) => {
      return prevTimeSlots.map((prevTimeSlot, i) => {
        if (index !== i) return prevTimeSlot;
        return {
          ...prevTimeSlot,
          courses: [
            ...prevTimeSlot.courses,
            {
              id: crypto.randomUUID(),
              startTime: {
                hour: "00",
                minute: "00",
              },
              endTime: {
                hour: "00",
                minute: "00",
              },
            },
          ],
        };
      });
    });
  };

  const handleDeleteCourseClick = (index: number, id: string) => {
    setTimeSlots((prevTimeSlots) => {
      return prevTimeSlots.map((prevTimeSlot, i) => {
        if (index !== i) return prevTimeSlot;
        return {
          ...prevTimeSlot,
          courses: prevTimeSlot.courses.filter((course) => course.id !== id),
        };
      });
    });
  };

  const handleUpdateCourseStartTimeClick = (
    index: number,
    id: string,
    hour: string,
    minute: string,
  ) => {
    setTimeSlots((prevTimeSlots) => {
      return prevTimeSlots.map((prevTimeSlot, i) => {
        if (index !== i) return prevTimeSlot;
        return {
          ...prevTimeSlot,
          courses: prevTimeSlot.courses.map((course) => {
            if (course.id !== id) return course;
            return {
              ...course,
              startTime: { hour, minute },
            };
          }),
        };
      });
    });
  };

  const handleUpdateCourseEndTimeClick = (
    index: number,
    id: string,
    hour: string,
    minute: string,
  ) => {
    setTimeSlots((prevTimeSlots) => {
      return prevTimeSlots.map((prevTimeSlot, i) => {
        if (index !== i) return prevTimeSlot;
        return {
          ...prevTimeSlot,
          courses: prevTimeSlot.courses.map((course) => {
            if (course.id !== id) return course;
            return {
              ...course,
              endTime: { hour, minute },
            };
          }),
        };
      });
    });
  };

  return (
    <>
      <div className="flex justify-center mb-20">
        <div className="w-full md:w-11/12 xl:w-4/5">
          <div className="flex justify-end py-2">
            <Button
              label="시간표 저장"
              onClick={() => {}}
              buttonType="btn-blue"
            />
          </div>
          <ClassGroupList name={className} setName={setClassName} />
          <TimeSlotList
            timeSlotList={timeSlots}
            breakTime={breakTime}
            onAddCourseClick={handleAddCourseClick}
            onDeleteCourseClick={handleDeleteCourseClick}
            onUpdateCourseStartTimeClick={handleUpdateCourseStartTimeClick}
            onUpdateCourseEndTimeClick={handleUpdateCourseEndTimeClick}
          />
          <div className="gap-4 py-6 lg:flex">
            <BreakTime
              label="점심"
              breakTime={breakTime.lunchTime}
              onStartTimeChange={handleBreakTimeChange(
                "lunchTime",
                "startTime",
              )}
              onEndTimeChange={handleBreakTimeChange("lunchTime", "endTime")}
            />
            <BreakTime
              label="저녁"
              breakTime={breakTime.dinnerTime}
              onStartTimeChange={handleBreakTimeChange(
                "dinnerTime",
                "startTime",
              )}
              onEndTimeChange={handleBreakTimeChange("dinnerTime", "endTime")}
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
