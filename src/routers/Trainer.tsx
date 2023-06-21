import React from 'react'
import { Routes, Route } from "react-router-dom";

import Home from "../pages/trainer/Home";
import Profile from "../pages/trainer/Profile";
import AuthProtectRoute from './ProtectRoutes/AuthProtectRoute';
import BackgroundTrainer from '../components/Theme/BackgroundTrainer';

import "../App.scss";

const Trainer = () => {
  return (
    <div className='text-primary_dark dark:text-primary_light'>
        <BackgroundTrainer />
        <Routes>
          <Route path="/" element={<AuthProtectRoute> <Home /> </AuthProtectRoute>}></Route>
          <Route path="/profile" element={<AuthProtectRoute> <Profile /></AuthProtectRoute> }></Route>
        </Routes>
    </div>
  )
}

export default Trainer