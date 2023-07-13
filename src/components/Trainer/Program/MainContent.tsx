import { ThunkDispatch } from '@reduxjs/toolkit';
import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBookingInfo } from '../../../app/slices/trainerSlice';
const BookingCard = React.lazy(() => import('./BookingCard').then(module => ({ default: module.BookingCard })));


export const MainContent = () => {

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const bookings = useSelector((state: any)=> state.trainer.bookings)

  useEffect(()=>{
    dispatch(getBookingInfo())
  },[dispatch])

  return (
    <div className="p-4 sm:ml-96 pt-16">
    <div className="p-8 pt-20 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
    <div><Suspense fallback = { <div> Please Wait... </div> } >
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-14 justify-center'>
        {bookings && 
          bookings.map((booking: any, index: number)=><BookingCard key={index} booking={booking} />
        )}
      </div>
      </Suspense></div>
    </div>
  </div>
  )
}
