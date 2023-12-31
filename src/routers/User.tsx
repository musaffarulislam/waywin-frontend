import React from 'react'
import { Routes, Route } from "react-router-dom";
import BackgroundUser from "../components/Theme/BackgroundUser";
import Home from "../pages/user/Home";
import Login from "../pages/common/Login";
import Signup from "../pages/common/Signup";
import Otp from "../pages/common/Otp";
import Trainers from '../pages/user/Trainers';

import AuthProtectRoute from './ProtectRoutes/AuthProtectRoute';

import "../App.scss";
import TrainerInfo from '../pages/user/TrainerInfo';
import { Error404 } from '../pages/common/Error404';
import Bookings from '../pages/user/Bookings';
import Chat from '../pages/user/Chat';

const User = () => {

  return (
    <div className='text-primary_dark dark:text-primary_light'>
        <BackgroundUser />
        <Routes>
          <Route path="/" element={<AuthProtectRoute> <Home /> </AuthProtectRoute>}></Route>
          <Route path="/login" element={ <AuthProtectRoute> <Login /> </AuthProtectRoute> }></Route>
          <Route path="/signup" element={<AuthProtectRoute> <Signup /> </AuthProtectRoute>}></Route>
          <Route path="/otp" element={<AuthProtectRoute> <Otp /> </AuthProtectRoute>}></Route>
          <Route path="/trainers" element={ <Trainers /> }></Route>
          <Route path="/trainer-info/:id" element={ <TrainerInfo /> }></Route>
          <Route path="/bookings" element={<AuthProtectRoute> <Bookings /> </AuthProtectRoute>}></Route>
          <Route path="/chat/:trainerId/:chatId" element={<AuthProtectRoute> <Chat /> </AuthProtectRoute>}></Route>
          <Route path="*" element={ <Error404 /> }></Route>
        </Routes>
    </div>
  ) 
}

export default User