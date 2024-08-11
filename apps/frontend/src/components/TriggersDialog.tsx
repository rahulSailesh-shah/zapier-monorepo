import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import { useZap } from "@/store/zap";
import { Icon } from "@/lib/Icon";

interface TriggersDialogProps {
  open: boolean;
  handleCloseDialog: (triggerId?: string) => void;
}

export const TriggersDialog: React.FC<TriggersDialogProps> = ({
  open,
  handleCloseDialog,
}) => {
  const { availableTriggers } = useZap();

  return (
    <Dialog
      open={open}
      onClose={() => handleCloseDialog()}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-base-300 bg-opacity-40 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform w-6/12 h-48 overflow-hidden rounded-2xl px-8 py-4 bg-base-100 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in "
          >
            <div className=" mt-4 ">
              <div>
                <h2 className="text-slate-400 font-medium text-xl mb-6">
                  Choose the trigger for your zap
                </h2>

                <div className=" flex flex-wrap items-center space-x-6">
                  {availableTriggers &&
                    availableTriggers
                      .filter((t) => t.id !== "default_trigger")
                      .map((trigger) => (
                        <button
                          key={trigger.id}
                          onClick={() => handleCloseDialog(trigger.id)}
                          className="flex items-center space-x-2 border-2 hover:bg-neutral cursor-pointer border-slate-600 rounded-xl px-4 py-2"
                        >
                          <Icon icon={trigger.id} />
                          <span>{trigger.name}</span>
                        </button>
                      ))}
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};
