import Button from "../Common/Button";

export default function ClassGroupSetting() {
  return (
    <div className="flex justify-end py-2">
      <Button label="교실 추가" onClick={() => {}} buttonType="btn-black" />
      <Button label="교실 삭제" onClick={() => {}} />
      <Button label="시간표 저장" onClick={() => {}} buttonType="btn-blue" />
    </div>
  );
}
