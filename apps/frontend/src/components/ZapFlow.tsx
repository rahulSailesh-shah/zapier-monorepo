import React, { useState } from "react";
import { Action, DialogState, Trigger, ZapData } from "@/lib/types";
import { useZap } from "@/store/zap";
import TaskCard from "./TaskCard";
import { TriggersDialog } from "./TriggersDialog";

interface ZapFlowProps {
  zap: ZapData;
}

const ZapFlow: React.FC<ZapFlowProps> = ({ zap }) => {
  const { updateZapTask } = useZap();
  const [dialogState, setDialogState] = useState<DialogState>({
    open: false,
    zapItemData: undefined,
  });

  const handleOpenDialog = (item: Trigger | Action, type: "read" | "write") => {
    setDialogState({
      open: true,
      zapItemData: {
        type,
        ...(type === "write" && { action: { id: item.id } }),
      },
    });
  };

  const handleCloseDialog = (triggerId?: string) => {
    setDialogState((prevState) => ({ ...prevState, open: false }));
    if (dialogState.zapItemData && triggerId) {
      updateZapTask(dialogState, triggerId);
    }
  };

  return (
    <div>
      <TaskCard
        type="read"
        id={zap.trigger.triggerId}
        setOpen={() => handleOpenDialog(zap.trigger, "read")}
      />
      {zap.action.map((action) => (
        <TaskCard
          key={action.id}
          type="write"
          id={action.actionId}
          setOpen={() => handleOpenDialog(action, "write")}
        />
      ))}
      <TriggersDialog
        open={dialogState.open}
        handleCloseDialog={handleCloseDialog}
      />
    </div>
  );
};

export default ZapFlow;
