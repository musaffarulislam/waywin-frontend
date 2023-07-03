import React from "react";

import "../../styles/modules/Scroll.scss";
import { NavbarAdmin } from "../../components/Navbars/NavbarAdmin";
import { MainContent } from "../../components/Admin/Home/MainContent";

const Home = () => {

  return (
    <div className="h-screen relative overflow-auto custom-scroll">
      <NavbarAdmin />
      <MainContent />
    </div>
  );
};

export default Home;
