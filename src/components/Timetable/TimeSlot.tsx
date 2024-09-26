import CourseBlock from "./CourseBlock";
import Button from "../Common/Button";

type TimeSlotProps = {
  name: string;
  description: string;
};

export default function TimeSlot({ name, description }: TimeSlotProps) {
  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex items-center gap-1 mb-4 font-bold">
        <span className="text-lg leading-none text-gray-900">{name}</span>
        <span className="text-xs leading-none text-gray-400">
          ({description})
        </span>
      </div>
      <ul className="divide-y divide-gray-200 mb-4">
        <CourseBlock />
        <CourseBlock />
        <CourseBlock />
        <CourseBlock />
        <CourseBlock />
      </ul>
      <Button
        label={`+ ${name} 교시 추가`}
        onClick={() => {}}
        isWidthFull
        buttonType="btn-black"
      />
    </div>
  );
}
