import React from 'react'
import { NavbarAdmin } from '../../components/Navbars/NavbarAdmin'
import { MainContent } from '../../components/Admin/BookingManagment/MainContent'
export const BookingManagment = () => {
  return (
    <div className="h-screen relative overflow-auto custom-scroll">
      <NavbarAdmin />
      <MainContent />
    </div>
  )
}
