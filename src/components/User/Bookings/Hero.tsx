import React, { Suspense, useEffect } from "react";
import { getAllTrainersInfo } from "../../../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
// import { TrainerCard } from './TrainerCard';
const BookingCard = React.lazy(() => import('./BookingCard').then(module => ({ default: module.BookingCard })));


const Hero = () => {

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const trainers = useSelector((state: any)=> state.user.trainers)

  useEffect(()=>{
    dispatch(getBookingsInfo())
  },[dispatch])

  return (
    <div className='px-6 pt-40 sm:px-14 md:px-40 m-16 mb-60 mx-auto max-w-screen-xl'>
      <div><Suspense fallback = { <div> Please Wait... </div> } >
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-14 justify-center'>
        {trainers && 
          trainers.map((trainer: any, index: number)=><BookingCard key={index} trainer={trainer} />
        )}
      </div>
      </Suspense></div>
    </div>
  )
}

export default Hero