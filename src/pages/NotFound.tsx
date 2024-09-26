import { useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-700 mb-4">Page Not Found</h1>
      <p className="text-xl text-gray-500 mb-8">존재하지 않는 페이지입니다.</p>

      <Button
        label="메인으로 돌아가기"
        onClick={() => navigate("/timetable")}
        buttonType="btn-black"
      />
    </div>
  );
}
