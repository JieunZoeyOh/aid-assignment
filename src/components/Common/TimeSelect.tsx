type TimeSelectProps = {
  time: string;
  handleTimeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  items: string[];
};

export default function TimeSelect({
  time,
  handleTimeChange,
  items,
}: TimeSelectProps) {
  return (
    <select
      value={time}
      onChange={handleTimeChange}
      className="w-6 appearance-none cursor-pointer text-center bg-gray-50 outline-none"
    >
      {items.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
