import React from "react";
import { HiOutlineLightningBolt } from "react-icons/hi";

interface TaskCardProps {
  setOpen: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ setOpen }) => {
  return (
    <div className="bg-base-100 rounded-2xl shadow-md py-4 px-6 w-96 flex flex-col items-start border-2">
      <button
        onClick={setOpen}
        className="flex items-center text-lg border-2 px-4 py-1 rounded-xl border-slate-700 text-neutral-400 hover:bg-neutral cursor-pointer"
      >
        <HiOutlineLightningBolt className="mr-2" />
        Action
      </button>

      <div className="font-medium text-lg mt-2 text-neutral-400">
        1. Select the event that runs your Zap
      </div>
    </div>
  );
};

export default TaskCard;
