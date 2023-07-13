import React from "react";
import { NavbarTrainer } from "../../components/Navbars/NavbarTrainer";

import "../../styles/modules/Scroll.scss";
import { MainContent } from "../../components/Trainer/Program/MainContent";

const Programs = () => {

  return (
    <div className="h-screen relative overflow-auto custom-scroll">
      <NavbarTrainer />
      <MainContent />
    </div>
  );
};

export default Programs;
