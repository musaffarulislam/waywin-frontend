import React, {FC} from 'react'
import NavbarUser from '../../components/Navbars/NavbarUser'
import Hero from '../../components/User/Home/Hero'
import "../../styles/modules/Scroll.scss";
const Home: FC = () => {
  return (
    <div className='h-screen overflow-auto custom-scroll'>
      <NavbarUser />
      <Hero />
      {/* <Hero /> */}
    </div>
  )
}

export default Home