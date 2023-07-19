import { ThunkDispatch } from '@reduxjs/toolkit';
import React, { Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllChats } from '../../../app/slices/trainerSlice'; 
const ChatCard = React.lazy(() => import('./ChatCard').then(module => ({ default: module.ChatCard })));
// const ChatCard = React.lazy(() => import('./ChatCard'));

export const MainContent = () => {

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const chats = useSelector((state: any)=> state.trainer.chats)

  useEffect(()=>{
    dispatch(getAllChats())
  },[dispatch])

  console.log("chats aaaaaaaaaaaaaaaaaaaaaaa :",chats)

  return (
    <div className="p-4 sm:ml-96 pt-16">
    <div className="p-8 pt-20 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
    <div><Suspense fallback = { <div> Please Wait... </div> } >
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