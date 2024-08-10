import Error from "@/components/Error";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

const ZapList = () => {
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();

  const handleCreateZap = async () => {
    setError(undefined);
    try {
      const response = await fetch(`${BACKEND_URL}/api/zap`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          availableTriggerId: "defaultTrigger",
          actions: [
            {
              availableActionId: "defaultAction",
            },
          ],
        }),
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        navigate(`/zap/${result.body.zapId}`);
      } else {
        setError(result.body.message);
      }
    } catch (error: unknown) {
      console.log(error);
      setError((error as Error).message);
    }
  };
  return (
    <div className="w-full bg-base-100 mx-4 p-4 rounded">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Dashboard</h1>
        <button className="btn btn-primary" onClick={handleCreateZap}>
          New Zap
        </button>
      </div>

      {error && <Error error={error} setError={setError} />}
    </div>
  );
};

export default ZapList;
