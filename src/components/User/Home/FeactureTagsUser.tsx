import React from 'react'
import SpecialFeatureCard from './SpecialFeactureCard'
import { TbDiscountCheckFilled } from 'react-icons/tb'
import { SiWechat } from 'react-icons/si' 
import { HiStatusOnline } from 'react-icons/hi'
import { BsCalendarDateFill } from 'react-icons/bs'

const FeactureTagsUser = () => {
  return (
    <div className='px-6 sm:px-14 md:px-40 m-16 '>
      <div>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-20 rounded-2xl '>
                <SpecialFeatureCard>
                  <div className='flex-cols justify-center items-center'>
                    <div className='flex items-center justify-center'>
                      <TbDiscountCheckFilled className='text-7xl mb-6'/> 
                    </div>
                    <h2 className='text-3xl text-center'>Verified trainers</h2>
                  </div>      
                </SpecialFeatureCard>   
                <SpecialFeatureCard> 
                  <div className='flex-cols justify-center items-center'>
                    <div className='flex items-center justify-center'>
                      <SiWechat className='text-7xl mb-6'/> 
                    </div>
                    <h2 className='text-3xl text-center'>Chat with trainers</h2>
                  </div>  
                </SpecialFeatureCard>         
                <SpecialFeatureCard>
                  <div className='flex-cols justify-center items-center'>
                    <div className='flex items-center justify-center'>
                      <BsCalendarDateFill className='text-7xl mb-6'/> 
                    </div>
                    <h2 className='text-3xl text-center'>Date & Time Booking</h2>
                  </div>  
                </SpecialFeatureCard>         
                <SpecialFeatureCard>                  
                  <div className='flex-cols justify-center items-center'>
                    <div className='flex items-center justify-center'>
                      <HiStatusOnline className='text-7xl mb-6'/> 
                    </div>
                    <h2 className='text-3xl text-center'>Online & Offline Consulting</h2>
                  </div>  
                </SpecialFeatureCard>         
            </div>

      </div>
    </div>
  )
}

export default FeactureTagsUser