import React from "react";
import { NavbarTrainer } from "../../components/Navbars/NavbarTrainer"; 
import { MainContent } from "../../components/Trainer/Chat/MainContent";

import "../../styles/modules/Scroll.scss";

const Chat = () => {

  return (
    <div className="h-screen relative overflow-auto custom-scroll">
      <NavbarTrainer />
      <MainContent />
    </div>
  );
};

export default Chat;
