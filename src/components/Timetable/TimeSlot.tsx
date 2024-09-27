import CourseBlock from "./CourseBlock";
import Button from "../Common/Button";

import useTimetableDispatch from "../../hooks/useTimetableDispatch";

import { TimeSlotProps } from "../../types";

export default function TimeSlot({
  slotIndex,
  name,
  description,
  courses,
}: TimeSlotProps) {
  const dispatch = useTimetableDispatch();

  const handleAddCourse = () => {
    dispatch({
      type: "ADD_COURSE",
      payload: { slotIndex },
    });
  };

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
            slotIndex={slotIndex}
            courseId={course.id}
            courseNumber={index + 1}
            startTime={course.startTime}
            endTime={course.endTime}
          />
        ))}
      </ul>
      <Button
        label={`+ ${name} 교시 추가`}
        onClick={handleAddCourse}
        buttonType="btn-black"
        isWidthFull
        isDisabled={courses.length >= 5}
      />
    </div>
  );
}
