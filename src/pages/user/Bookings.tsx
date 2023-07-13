import React, {FC} from 'react'
import NavbarUser from '../../components/Navbars/NavbarUser'
import Hero from '../../components/User/Bookings/Hero';
import "../../styles/modules/Scroll.scss";

const Bookings: FC = () => {
  return (
    <div className='h-screen overflow-auto custom-scroll'>
      <NavbarUser />
      <Hero />
    </div>
  )
}

export default Bookings