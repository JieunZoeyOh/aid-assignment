import CourseBlock from "./CourseBlock";
import Button from "../Common/Button";

type TimeSlotProps = {
  name: string;
  description: string;
};

export default function TimeSlot({ name, description }: TimeSlotProps) {
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex items-center mb-4">
        <span className="text-lg font-bold leading-none text-gray-900">
          {name}
        </span>
        <span className="text-xs font-bold leading-none text-gray-400 ml-1">
          ({description})
        </span>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          <CourseBlock />
          <CourseBlock />
          <CourseBlock />
          <CourseBlock />
          <CourseBlock />
        </ul>
      </div>
      <Button
        title={`+ ${name} 교시 추가`}
        onClick={() => {}}
        isWidthFull
        buttonType="btn-black"
      />
    </div>
  );
}
