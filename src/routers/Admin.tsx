import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import BackgroundAdmin from '../components/Theme/BackgroundAdmin';

import Home from "../pages/admin/Home"
import AdminProtectRoute from './ProtectRoutes/AdminProtectRoute';
import { UserManagment } from '../pages/admin/UserManagment';
import { TrainerManagment } from '../pages/admin/TrainerManagment';


import "../App.scss";

const Admin = () => {
  return (
    <div className='text-primary_dark dark:text-primary_light'>
      <BackgroundAdmin />
      <Routes>
          <Route path="/" element={<AdminProtectRoute> <Home /> </AdminProtectRoute>}></Route>
          <Route path="/user-managment" element={<AdminProtectRoute> <UserManagment /> </AdminProtectRoute>}></Route>
          <Route path="/trainer-managment" element={<AdminProtectRoute> <TrainerManagment /> </AdminProtectRoute>}></Route>
        </Routes>
    </div>
  )
}

export default Admin