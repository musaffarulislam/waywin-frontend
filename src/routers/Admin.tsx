import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import BackgroundAdmin from '../components/Theme/BackgroundAdmin';

import Home from "../pages/admin/Home"
import Login from '../pages/admin/Login';
import AdminProtectRoute from './ProtectRoutes/AdminProtectRoute';
import { UserManagment } from '../pages/admin/UserManagment';
import { TrainerManagment } from '../pages/admin/TrainerManagment';
import { TagsManagment } from '../pages/admin/TagsManagment';
import { BookingManagment } from '../pages/admin/BookingManagment';


import "../App.scss";
import { Error404 } from '../pages/common/Error404';

const Admin = () => {
  return (
    <div className='text-primary_dark dark:text-primary_light'>
      <BackgroundAdmin />
      <Routes>
          <Route path="/" element={<AdminProtectRoute> <Home /> </AdminProtectRoute>}></Route>
          <Route path="/login" element={<AdminProtectRoute> <Login /> </AdminProtectRoute>}></Route>
          <Route path="/user-managment" element={<AdminProtectRoute> <UserManagment /> </AdminProtectRoute>}></Route>
          <Route path="/trainer-managment" element={<AdminProtectRoute> <TrainerManagment /> </AdminProtectRoute>}></Route>
          <Route path="/tags-managment" element={<AdminProtectRoute> <TagsManagment /> </AdminProtectRoute>}></Route>
          <Route path="/bookings-managment" element={<AdminProtectRoute> <BookingManagment /> </AdminProtectRoute>}></Route>
          <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default Admin