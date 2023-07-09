import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import Home from "../pages/trainer/Home";
import Profile from "../pages/trainer/Profile";
import AuthProtectRoute from './ProtectRoutes/AuthProtectRoute';
import BackgroundTrainer from '../components/Theme/BackgroundTrainer';

import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { getTrainerInfo, getTrainerProfile } from '../app/slices/trainerSlice';
import AvailableDate from '../pages/trainer/AvailableDate';

import "../App.scss";

const Trainer = () => {

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
  const isProfile: boolean = useSelector((state: any)=> state.trainer.isProfile)
 
  useEffect(() => {
    dispatch(getTrainerInfo())
    if(isProfile){
      dispatch(getTrainerProfile())
    }
  }, [dispatch, isProfile])

  return (
    <div className='text-primary_dark dark:text-primary_light'>
        <BackgroundTrainer />
        <Routes>
          <Route path="/" element={<AuthProtectRoute> <Home /> </AuthProtectRoute>}></Route>
          <Route path="/profile" element={<AuthProtectRoute> <Profile /></AuthProtectRoute> }></Route>
          <Route path="/dates" element={<AuthProtectRoute> <AvailableDate /></AuthProtectRoute> }></Route>
          <Route path="*" element={<Home />} />
        </Routes>
    </div>
  )
}

export default Trainer