import React, {FC} from 'react'
import NavbarUser from '../../components/Navbars/NavbarUser'
import Hero from '../../components/User/TrainerInfo/Hero';
import "../../styles/modules/Scroll.scss";

const TrainerInfo: FC = () => {
  return (
    <div className='h-screen overflow-auto custom-scroll'>
      <NavbarUser />
      <Hero />
    </div>
  )
}

export default TrainerInfo