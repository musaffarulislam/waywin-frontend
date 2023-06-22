import React from "react";
import { NavbarTrainer } from "../../components/Navbars/NavbarTrainer";
import { MainContent } from "../../components/Trainer/Home/MainContent";

import "../../styles/modules/Scroll.scss";

const Home = () => {

  return (
    <div className="h-screen relative overflow-auto custom-scroll">
      <NavbarTrainer />
      <MainContent />
    </div>
  );
};

export default Home;
