import { useParams, useNavigate } from "react-router-dom";
import backgroundSvg from "../../assets/background.svg";
import { useEffect } from "react";
import { useZap } from "@/store/zap";
import { useError } from "@/store/error";

const ZapCreate = () => {
  const navigate = useNavigate();
  const { zapId } = useParams<{ zapId: string }>();
  const { error } = useError();
  const { zap, fetchZap } = useZap();

  useEffect(() => {
    if (zapId) {
      fetchZap(zapId);
    }

    if (error) {
      navigate("/");
    }
  }, [zapId, fetchZap, error, navigate]);

  console.log(zap);

  return (
    <div className="relative">
      <section
        className="bg-cover bg-center bg-no-repeat bg-base-300 min-h-screen flex items-center justify-center overflow-y-auto"
        style={{ backgroundImage: `url(${backgroundSvg})` }}
      >
        <h1>knevkjenkjrn</h1>
      </section>
    </div>
  );
};

export default ZapCreate;
