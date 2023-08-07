import { ThunkDispatch } from '@reduxjs/toolkit';
import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllChats } from '../../../app/slices/trainerSlice'; 
import Puff from 'react-loading-icons/dist/esm/components/puff';
const ChatCard = React.lazy(() => import('./ChatCard').then(module => ({ default: module.ChatCard }))); 

export const MainContent = () => {

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const chats = useSelector((state: any)=> state.trainer.chats)

  useEffect(()=>{
    dispatch(getAllChats())
  },[dispatch])

  return (
    <div className="p-4 sm:ml-96 pt-16">
    <div className="p-8 pt-20 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
    <div><Suspense fallback = { 
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <Puff />
      </div>
    } >
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-14 justify-center'>
        {chats && 
          chats.map((chat: any, index: number)=><ChatCard key={index} chat={chat} />
        )}
      </div>
      </Suspense></div>
    </div>
  </div>
  )
}