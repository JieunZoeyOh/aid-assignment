import Button from "../Common/Button";
import TimeInput from "../Common/TimeInput";

export default function CourseBlock() {
  return (
    <li className="py-3">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm">1교시</div>
          <Button
            label="삭제"
            onClick={() => {}}
            buttonSize="btn-sm"
            buttonType="btn-red"
          />
        </div>
        <div className="flex text-gray-900 gap-2">
          <TimeInput />
          <span className="flex items-center">~</span>
          <TimeInput />
        </div>
      </div>
    </li>
  );
}
