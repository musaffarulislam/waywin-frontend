import React, {FC} from 'react'
import NavbarUser from '../../components/Navbars/NavbarUser' 
import "../../styles/modules/Scroll.scss";
import Hero from '../../components/User/Chat/Hero';

const Chat: FC = () => {
  return (
    <div className='h-screen overflow-auto custom-scroll'>
      <NavbarUser />
      <Hero />
    </div>
  )
}

export default Chat