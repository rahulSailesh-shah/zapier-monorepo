import Sidebar from "@/components/Sidebar";
import React from "react";
import ZapList from "./Zap/ZapList";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <ZapList />
    </div>
  );
};

export default Home;
