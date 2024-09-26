import TimeSlot from "./TimeSlot";

const TIME_SLOTS = [
  { name: "오전", description: "~12:00" },
  { name: "오후", description: "13:00~" },
  { name: "저녁", description: "19:00~" },
];

export default function TimeSlotList() {
  return (
    <div className="grid grid-cols-1 my-2 lg:grid-cols-3 gap-2 justify-items-center items-center">
      {TIME_SLOTS.map((timeSlot) => (
        <TimeSlot key={timeSlot.name} {...timeSlot} />
      ))}
    </div>
  );
}
