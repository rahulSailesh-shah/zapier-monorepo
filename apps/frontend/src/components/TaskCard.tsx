import React from "react";
import { Icon } from "@/lib/Icon";
import { useZap } from "@/store/zap";

interface TaskCardProps {
  setOpen: () => void;
  type: "read" | "write";
  id: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ setOpen, type, id }) => {
  const { availableTriggers, availableActions } = useZap();

  const getDetails = (type: "read" | "write", id: string) =>
    type === "read"
      ? availableTriggers.find((trigger) => trigger.id === id)
      : availableActions.find((action) => action.id === id);

  const details = getDetails(type, id);

  return (
    <div className="bg-slate-700 rounded-2xl shadow-md py-4 px-6 w-96 flex flex-col items-start border-2">
      <button
        onClick={setOpen}
        className="flex items-center text-lg border-2 px-4 py-1 rounded-xl border-slate-500 text-slate-200 hover:bg-slate-600 cursor-pointer"
      >
        {details && <Icon icon={details.id} />}
        <span className="mx-2">{details?.name}</span>
      </button>
      <div className="text-lg mt-2 text-slate-400">
        Task or Action description
      </div>
    </div>
  );
};

export default TaskCard;
