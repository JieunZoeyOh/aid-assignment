import ClassGroupSetting from "./components/Timetable/ClassGroupSetting";
import ClassGroupList from "./components/Timetable/ClassGroupList";
import TimeSlotList from "./components/Timetable/TimeSlotList";
import BreakTime from "./components/Timetable/BreakTime";

export default function App() {
  return (
    <div className="flex justify-center mb-20">
      <div className="w-full md:w-4/5">
        <ClassGroupSetting />
        <ClassGroupList />
        <TimeSlotList />
        <BreakTime />
      </div>
    </div>
  );
}
