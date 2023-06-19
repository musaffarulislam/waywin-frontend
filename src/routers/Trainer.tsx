import React from 'react'
import { Routes, Route } from "react-router-dom";

import Home from "../pages/trainer/Home";
import PrivateRoute from './PrivateRoute';
import BackgroundTrainer from '../components/Theme/BackgroundTrainer';

import "../App.scss";

const Trainer = () => {
  return (
    <div>
        <BackgroundTrainer />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          {/* <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}></Route> */}
        </Routes>
    </div>
  )
}

export default Trainer