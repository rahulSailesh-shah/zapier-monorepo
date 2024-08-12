import ZapList from "@/components/ZapList";
import { ZapData } from "@/lib/types";
import { useError } from "@/store/error";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string;

const ZapDashboard = () => {
  const { setError } = useError();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [zaps, setZaps] = useState<ZapData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/api/zap`, {
          credentials: "include",
        });
        const result = await response.json();
        if (response.ok) {
          setZaps(result);
        } else {
          setError(result.body.message);
        }
      } catch (error: unknown) {
        console.log(error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setError]);

  console.log(zaps);

  const handleCreateZap = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/zap`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          availableTriggerId: "default_trigger",
          actions: [
            {
              availableActionId: "default_action",
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-base-300 min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </section>
    );
  }

  return (
    <div className="w-full flex-1 bg-base-100 mx-4 p-4 rounded">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl">Dashboard</h1>
        <button className="btn btn-primary" onClick={handleCreateZap}>
          New Zap
        </button>
      </div>
      <ZapList zaps={zaps} />
    </div>
  );
};

export default ZapDashboard;
