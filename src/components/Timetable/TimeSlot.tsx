import CourseBlock from "./CourseBlock";
import Button from "../Common/Button";

import { Course } from "../../types";

type TimeSlotProps = {
  name: string;
  description: string;
  startIndex: number;
  courses: Course[];
  onAddCourseClick: () => void;
  onUpdateCourseStartTimeClick: (
    id: string,
    hour: string,
    minute: string,
  ) => void;
  onUpdateCourseEndTimeClick: (
    id: string,
    hour: string,
    minute: string,
  ) => void;
  onDeleteCourseClick: (id: string) => void;
};

export default function TimeSlot({
  name,
  description,
  startIndex,
  courses,
  onAddCourseClick,
  onUpdateCourseStartTimeClick,
  onUpdateCourseEndTimeClick,
  onDeleteCourseClick,
}: TimeSlotProps) {
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex items-center gap-1 mb-4 font-bold">
        <span className="text-lg leading-none text-gray-900">{name}</span>
        <span className="text-xs leading-none text-gray-400">
          ({description})
        </span>
      </div>
      <ul className="divide-y divide-gray-200 mb-4">
        {courses.map((course, index) => (
          <CourseBlock
            key={course.id}
            courseNumber={startIndex + index + 1}
            startTime={course.startTime}
            endTime={course.endTime}
            onStartTimeChange={(hour, minute) =>
              onUpdateCourseStartTimeClick(course.id, hour, minute)
            }
            onEndTimeChange={(hour, minute) =>
              onUpdateCourseEndTimeClick(course.id, hour, minute)
            }
            onDeleteCourseClick={() => onDeleteCourseClick(course.id)}
          />
        ))}
      </ul>
      <Button
        label={`+ ${name} 교시 추가`}
        onClick={onAddCourseClick}
        buttonType="btn-black"
        isWidthFull
        isDisabled={courses.length >= 5}
      />
    </div>
  );
}
