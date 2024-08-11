import { useParams, useNavigate } from "react-router-dom";
import backgroundSvg from "../../assets/background.svg";
import { useEffect, useState } from "react";
import { useZap } from "@/store/zap";
import { useError } from "@/store/error";
import ZapFlow from "@/components/ZapFlow";

const ZapEditor = () => {
  const navigate = useNavigate();
  const { zapId } = useParams<{ zapId: string }>();
  const { error } = useError();
  const { zap, fetchZap, setAvailableActions, setAvailableTriggers } = useZap();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (zapId: string) => {
      try {
        setLoading(true);
        await fetchZap(zapId);
        await setAvailableActions();
        await setAvailableTriggers();
      } catch (error: unknown) {
        console.log(error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    if (!zapId) return navigate("/");
    fetchData(zapId);
  }, [
    zapId,
    fetchZap,
    error,
    navigate,
    setAvailableActions,
    setAvailableTriggers,
  ]);

  if (loading) {
    return (
      <div className="relative">
        <section
          className="bg-cover bg-center bg-no-repeat bg-base-300 min-h-screen flex items-center justify-center overflow-y-auto"
          style={{ backgroundImage: `url(${backgroundSvg})` }}
        >
          <span className="loading loading-spinner loading-lg"></span>
        </section>
      </div>
    );
  }

  console.log(zap);

  return (
    <div className="relative">
      <section
        className="bg-cover bg-center bg-no-repeat bg-base-300 min-h-screen flex items-center justify-center overflow-y-auto"
        style={{ backgroundImage: `url(${backgroundSvg})` }}
      >
        {zap && (
          <div>
            <ZapFlow zap={zap} />
          </div>
        )}
      </section>
    </div>
  );
};

export default ZapEditor;
