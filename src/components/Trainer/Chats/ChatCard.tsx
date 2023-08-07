import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate } from 'react-router-dom';
import { getAllTrainersInfo } from '../../../app/slices/userSlice';
import { ThunkDispatch } from '@reduxjs/toolkit'; 
import { IAuth } from '../../../utils/entity/AuthEntity';
import { getAuthInfo } from '../../../app/slices/authSlice';

type ChatCardProps = {
    chat: any
}

export const ChatCard = ({chat}: ChatCardProps) => {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>(); 
    const auth: IAuth = useSelector((state: any)=> state.auth.auth)
  const navigate = useNavigate()

  useEffect(()=>{
    dispatch(getAllTrainersInfo())
  },[dispatch])

  useEffect(() => {
    dispatch(getAuthInfo())
  },[dispatch])

  const handleChat = () => {
    let userId = chat?.users[0]._id
    if(chat?.users[0] === auth?._id){
        userId = chat?.user[1]._id
    }
    navigate(`/trainer/chat/${userId}/${chat?._id}`);
  }

  return (
    <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-slate-900 dark:border-gray-700 my-14">
        <div className='flex flex-col items-center pb-10'>
            {chat?.userId?.profileImage?.url ?
                <img className="absolute -top-24 w-52 h-52 mb-3 rounded-full shadow-lg object-cover" src={chat?.userId?.profileImage?.url} alt="Trainer"/>
            :(                
                <div className="absolute -top-24 w-52 h-52 mb-3 rounded-full shadow-lg object-cover">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.8 61.8" id="avatar"><g data-name="Layer 2"><g data-name="—ÎÓÈ 1"><circle cx="30.9" cy="30.9" r="30.9" fill="#485a69"></circle><path fill="#f9dca4" fillRule="evenodd" d="M23.242 38.592l15.92.209v12.918l-15.907-.121-.013-13.006z"></path><path fill="#d5e1ed" fillRule="evenodd" d="M53.478 51.993A30.814 30.814 0 0 1 30.9 61.8a31.225 31.225 0 0 1-3.837-.237A30.699 30.699 0 0 1 15.9 57.919a31.033 31.033 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 4.535 1.84 6.152 7.97 6.244 7.57.113 7.94-1.606 7.94-6.28l12.79 6.281z"></path><path fillRule="evenodd" d="M39.165 38.778v3.404c-2.75 4.914-14 4.998-15.923-3.59z" opacity=".11"></path><path fill="#ffe8be" fillRule="evenodd" d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z"></path><path fill="#f9dca4" fillRule="evenodd" d="M18.365 24.045c-3.07 1.34-.46 7.687 1.472 7.658a31.973 31.973 0 01-1.472-7.658zM44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.992 31.992 0 001.471-7.658z"></path><path fill="#ecbe6a" fillRule="evenodd" d="M43.409 29.584s1.066-8.716-2.015-11.752c-1.34 3.528-7.502 4.733-7.502 4.733a16.62 16.62 0 0 0 3.215-2.947c-1.652.715-6.876 2.858-11.61 1.161a23.715 23.715 0 0 0 3.617-2.679s-4.287 2.322-8.44 1.742c-2.991 2.232-1.66 9.162-1.66 9.162C15 18.417 18.697 6.296 31.39 6.226c12.358-.069 16.17 11.847 12.018 23.358z"></path><path fill="#fff" fillRule="evenodd" d="M23.255 42.179a17.39 17.39 0 0 0 7.958 6.446l-5.182 5.349L19.44 43.87z"></path><path fill="#fff" fillRule="evenodd" d="M39.16 42.179a17.391 17.391 0 0 1-7.958 6.446l5.181 5.349 6.592-10.103z"></path><path fill="#3dbc93" fillRule="evenodd" d="M33.366 61.7q-1.239.097-2.504.098-.954 0-1.895-.056l1.031-8.757h2.41z"></path><path fill="#3dbc93" fillRule="evenodd" d="M28.472 51.456l2.737-2.817 2.736 2.817-2.736 2.817-2.737-2.817z"></path></g></g></svg>
                </div>
            )}
        </div>
        <div className="flex flex-col items-center pb-10 mt-20">
            <h5 className="mb-1 mt-6 text-2xl font-medium text-gray-900 dark:text-white">{ chat?.users[0]._id === auth?._id ? chat?.users[0]?.username : chat?.users[1]?.username }</h5> 
            <span className="text-sm text-gray-600 dark:text-gray-200 px-4 text-center p-2">
                <b>{chat?.latestMessage?.sender?._id !== auth?._id ? chat?.latestMessage?.sender?.username : "You"} : </b>
                {chat?.latestMessage?.content.length > 50
                      ? chat?.latestMessage?.content?.substring(0, 51) + "..."
                      : chat?.latestMessage?.content}
            </span>
            <div className="flex mt-4 space-x-3 md:mt-6">
                <div className="inline-flex items-center px-4 py-2 text-xl font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 cursor-pointer"
                    onClick={handleChat}
                >
                    Message
                </div>
            </div>
        </div>
    </div> 
  )
}
