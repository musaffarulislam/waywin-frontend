import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";

import Home from "../pages/trainer/Home";
import Profile from "../pages/trainer/Profile";
import AuthProtectRoute from './ProtectRoutes/AuthProtectRoute';
import BackgroundTrainer from '../components/Theme/BackgroundTrainer';
import { Error404 } from '../pages/common/Error404';
import Programs from '../pages/trainer/Programs';
import AvailableDate from '../pages/trainer/AvailableDate';
import { getTrainerInfo, getTrainerProfile } from '../app/slices/trainerSlice';

import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

import "../App.scss";
import Chats from '../pages/trainer/Chats';
import Chat from '../pages/trainer/Chat';

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
          <Route path="/programs" element={<AuthProtectRoute> <Programs /></AuthProtectRoute> }></Route>
          <Route path="/chats" element={<AuthProtectRoute> <Chats /></AuthProtectRoute> }></Route>
          <Route path="/chat/:userId/:chatId" element={<AuthProtectRoute> <Chat /></AuthProtectRoute> }></Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
    </div>
  )
}

export default Trainer