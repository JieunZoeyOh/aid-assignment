import TimeSlot from "./TimeSlot";
import { BreakTime, TimeSlot as TimeSlotType } from "../../types";

type TimeSlotListType = {
  timeSlotList: TimeSlotType[];
  breakTime: BreakTime;
  onAddCourseClick: (index: number) => void;
  onDeleteCourseClick: (index: number, id: string) => void;
  onUpdateCourseStartTimeClick: (
    index: number,
    id: string,
    hour: string,
    minute: string,
  ) => void;
  onUpdateCourseEndTimeClick: (
    index: number,
    id: string,
    hour: string,
    minute: string,
  ) => void;
};

export default function TimeSlotList({
  timeSlotList,
  breakTime,
  onAddCourseClick,
  onDeleteCourseClick,
  onUpdateCourseStartTimeClick,
  onUpdateCourseEndTimeClick,
}: TimeSlotListType) {
  return (
    <div className="justify-items-center items-start grid grid-cols-1 my-2 lg:grid-cols-3 gap-2">
      <TimeSlot
        name="오전"
        description={`~${breakTime.lunchTime.startTime.hour}:${breakTime.lunchTime.startTime.minute}`}
        startIndex={0}
        courses={timeSlotList[0].courses}
        onAddCourseClick={() => onAddCourseClick(0)}
        onDeleteCourseClick={(id) => onDeleteCourseClick(0, id)}
        onUpdateCourseStartTimeClick={(id, hour, minute) =>
          onUpdateCourseStartTimeClick(0, id, hour, minute)
        }
        onUpdateCourseEndTimeClick={(id, hour, minute) =>
          onUpdateCourseEndTimeClick(0, id, hour, minute)
        }
      />
      <TimeSlot
        name="오후"
        description={`${breakTime.lunchTime.endTime.hour}:${breakTime.lunchTime.endTime.minute}~`}
        startIndex={timeSlotList[0].courses.length}
        courses={timeSlotList[1].courses}
        onAddCourseClick={() => onAddCourseClick(1)}
        onDeleteCourseClick={(id) => onDeleteCourseClick(1, id)}
        onUpdateCourseStartTimeClick={(id, hour, minute) =>
          onUpdateCourseStartTimeClick(1, id, hour, minute)
        }
        onUpdateCourseEndTimeClick={(id, hour, minute) =>
          onUpdateCourseEndTimeClick(1, id, hour, minute)
        }
      />
      <TimeSlot
        name="저녁"
        description={`${breakTime.dinnerTime.endTime.hour}:${breakTime.dinnerTime.endTime.minute}~`}
        startIndex={
          timeSlotList[0].courses.length + timeSlotList[1].courses.length
        }
        courses={timeSlotList[2].courses}
        onAddCourseClick={() => onAddCourseClick(2)}
        onDeleteCourseClick={(id) => onDeleteCourseClick(2, id)}
        onUpdateCourseStartTimeClick={(id, hour, minute) =>
          onUpdateCourseStartTimeClick(2, id, hour, minute)
        }
        onUpdateCourseEndTimeClick={(id, hour, minute) =>
          onUpdateCourseEndTimeClick(2, id, hour, minute)
        }
      />
    </div>
  );
}
