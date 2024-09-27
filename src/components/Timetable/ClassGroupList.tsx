import ClassGroup from "./ClassGroup";

type ClassGroupListProps = {
  name: string;
  setName?: (name: string) => void;
};
export default function ClassGroupList({ name, setName }: ClassGroupListProps) {
  return (
    <nav className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
      <ul className="flex flex-wrap">
        <ClassGroup name={name} setName={setName} isActive />
      </ul>
    </nav>
  );
}
