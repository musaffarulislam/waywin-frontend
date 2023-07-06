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
          <Route path="/trainer-info" element={ <TrainerInfo /> }></Route>
        </Routes>
    </div>
  ) 
}

export default User