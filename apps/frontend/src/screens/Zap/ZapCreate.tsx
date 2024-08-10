import backgroundSvg from "../../assets/background.svg";

const ZapCreate = () => {
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
