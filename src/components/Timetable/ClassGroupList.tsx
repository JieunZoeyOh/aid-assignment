import ClassGroup from "./ClassGroup";

export default function ClassGroupList() {
  return (
    <nav className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
      <ul className="flex flex-wrap">
        <ClassGroup name="2A-1" isActive />
        <ClassGroup name="2A-2" />
        <ClassGroup name="2A-3" />
        <ClassGroup name="3B-1" />
        <ClassGroup name="3B-2" />
      </ul>
    </nav>
  );
}
