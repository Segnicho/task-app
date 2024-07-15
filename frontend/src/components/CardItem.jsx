/* eslint-disable react/prop-types */
import { Progress } from "antd";
import "tailwindcss/tailwind.css";

const CardItem = ({ name, completedTasks, totalTasks, icon }) => {
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="bg-[#2D2E33] p-4 rounded-lg shadow-lg text-white w-48 h-48 relative">
      <div className="flex items-center justify-start mb-2">
        {icon}
      </div>
      <div className="text-xl font-bold text-start mb-2">{name}</div>
      <div className="absolute bottom-4 left-4 text-sm">
        {completedTasks}/{totalTasks} Done
      </div>
      <div className="absolute bottom-4 right-4">
        <Progress
          type="circle"
          percent={progress}
          width={40}
          strokeColor="#F3829D"
        />
      </div>
    </div>
  );
};

export default CardItem;
