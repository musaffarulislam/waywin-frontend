import React from 'react'
import { Routes, Route } from "react-router-dom";

import Home from "../pages/trainer/Home";
import PrivateRoute from './PrivateRoute';

const Trainer = () => {
  return (
        <Routes>
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}></Route>
        </Routes>
  )
}

export default Trainer