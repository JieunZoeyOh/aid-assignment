import Button from "../Common/Button";
import TimeInput from "../Common/TimeInput";

export default function CourseBlock() {
  return (
    <li className="py-3">
      <div className="flex flex-col">
        <div className="flex justify-between items-center w-full mb-2">
          <div className="text-sm">1교시</div>
          <Button
            title="삭제"
            onClick={() => {}}
            buttonSize="btn-sm"
            buttonType="btn-red"
          />
        </div>
        <div className="flex flex-wrap min-w-0 text-sm font-medium text-gray-900 items-center gap-1">
          <TimeInput />
          <span className="px-2 flex items-center">~</span>
          <TimeInput />
        </div>
      </div>
    </li>
  );
}
