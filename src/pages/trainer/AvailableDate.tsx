import React from "react";
import { NavbarTrainer } from "../../components/Navbars/NavbarTrainer";
import { MainContent } from "../../components/Trainer/AvailableDate.tsx/MainContent";



const AvailableDate = () => {

  return (
    <div className="h-screen relative overflow-auto custom-scroll">
      <NavbarTrainer />
      <MainContent />
    </div>
  );
};

export default AvailableDate;
