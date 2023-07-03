import React from 'react'
import { NavbarAdmin } from '../../components/Navbars/NavbarAdmin'
import { MainContent } from '../../components/Admin/TrainerManagment/MainContent'

export const TrainerManagment = () => {
  return (
    <div className="h-screen relative overflow-auto custom-scroll">
      <NavbarAdmin />
      <MainContent />
    </div>
  )
}
