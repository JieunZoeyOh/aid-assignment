import Button from "./Button";

import useAlertDispatch from "../../hooks/useAlertDispatch";
import useTimetableState from "../../hooks/useTimetableState";

import { CLASS_NAME, findCourseIndex } from "../../utils/course";
import validateTimetable from "../../utils/validators";

export default function Header() {
  const timetableState = useTimetableState();
  const alertDispatch = useAlertDispatch();

  const handleTimetableStore = () => {
    const validationMessage = validateTimetable(timetableState);

    if (validationMessage) {
      const courseNumber = findCourseIndex(
        timetableState.timeSlots,
        validationMessage.courseId,
      );

      const message = `${courseNumber}교시 ${validationMessage.message}`;
      alertDispatch({ type: "SHOW_ALERT", payload: { message } });
    } else {
      localStorage.setItem(CLASS_NAME, JSON.stringify(timetableState));

      const message = "데이터를 저장했습니다.";
      alertDispatch({ type: "SHOW_ALERT", payload: { message } });
    }
  };

  return (
    <div className="flex justify-end py-2">
      <Button
        label="시간표 저장"
        onClick={handleTimetableStore}
        buttonType="btn-blue"
      />
    </div>
  );
}
