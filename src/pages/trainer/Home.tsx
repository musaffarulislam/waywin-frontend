import React, { useEffect } from "react";
import { NavbarTrainer } from "../../components/Navbars/NavbarTrainer";
import { MainContent } from "../../components/Trainer/Home/MainContent";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getTrainerInfo, getTrainerProfile } from "../../app/slices/trainerSlice";

import "../../styles/modules/Scroll.scss";

const Home = () => {

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const isProfile: boolean = useSelector((state: any)=> state.trainer.isProfile)
 
  useEffect(() => {
    dispatch(getTrainerInfo())
    if(isProfile){
      dispatch(getTrainerProfile())
    }
  }, [dispatch, isProfile])


  return (
    <div className="h-screen relative overflow-auto custom-scroll">
      <NavbarTrainer />
      <MainContent />
    </div>
  );
};

export default Home;
