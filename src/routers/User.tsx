import React from 'react'
import { Routes, Route } from "react-router-dom";
import BackgroundUser from "../components/Theme/BackgroundUser";
import Home from "../pages/user/Home";
import Login from "../pages/common/Login";
import Signup from "../pages/common/Signup";
import Otp from "../pages/common/Otp";
import PrivateRoute from './PrivateRoute';

import "../App.scss";

const User = () => {

  return (
    <div className='text-primary_dark dark:text-primary_light'>
        <BackgroundUser />
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}></Route>
          <Route path="/login" element={<PrivateRoute><Login /></PrivateRoute>}></Route>
          <Route path="/signup" element={<PrivateRoute><Signup /></PrivateRoute>}></Route>
          <Route path="/otp" element={<PrivateRoute><Otp /></PrivateRoute>}></Route>
        </Routes>
    </div>
  )
}

export default User