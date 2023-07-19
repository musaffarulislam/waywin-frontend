import React, { Suspense, useEffect, useState } from "react";
import {  getAllMessages, getTrainerInfo, sendMessage } from "../../../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { FiSend } from "react-icons/fi";
// import { TrainerCard } from './TrainerCard';
import "../../../styles/modules/Scroll.scss";
import { useNavigate, useParams } from "react-router-dom"; 
import { getAuthInfo } from "../../../app/slices/authSlice";
import { IAuth } from "../../../utils/entity/AuthEntity";


const Hero = () => {

  const { trainerId, chatId } = useParams()

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate()

  const [isMessages, setIsMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState<string>("")

  const auth: IAuth = useSelector((state: any)=> state.auth.auth)
  const trainerInfo = useSelector((state: any)=> state.user.trainerInfo)

  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  useEffect(() => {
    if(accessToken){
      dispatch(getAuthInfo())
      dispatch(getTrainerInfo(trainerId))
    }
  },[accessToken, dispatch, trainerId])

  const typingHandler = (value: string) =>{
    setNewMessage(value)
  } 

  const handleSendMessage = async () => {
    if (newMessage) {
      const result = await dispatch(sendMessage({ newMessage, chatId }));
      console.log("Herooo : ",result)
      const payload = result.payload; // Access the payload property if it exists
      setIsMessages([...isMessages, payload]); // Update state with payload value
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {payload} = await dispatch(getAllMessages(chatId));
        setIsMessages(payload) 
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData(); 
  }, [dispatch, chatId])

  useEffect(()=>{
    dispatch(getTrainerInfo(trainerId))
  },[dispatch, trainerId])

  const handleTrainer = () => {
    navigate(`/trainer-info/${trainerId}`);
  }

  return (
    <div className='px-6 sm:px-14 md:px-40 lg:px-64 mx-auto pt-16 pb-8 max-w-screen-xl h-screen'>
      <div className="pt-12 h-full">
        <div className="relative h-full overflow-hidden p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 flex flex-col ">
            <div className="text-primary_dark flex justify-between items-center px-10 py-3 bg-slate-50 shadow-2xl rounded-xl cursor-pointer" onClick={handleTrainer}>
              <div className="flex items-center gap-2 text-xl">
                <div className="inset-0 flex flex-col items-center justify-start w-12 h-12  rounded-2xl ">
                  { trainerInfo && trainerInfo?.profileImssage?.url ?
                      <>
                        <img src={trainerInfo?.profileImage.url} alt="Preview" className="w-full h-full object-cover  rounded-full" />      
                      </>
                    :
                    <div className="w-full h-full object-contain rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.8 61.8" id="avatar"><g data-name="Layer 2"><g data-name="—ÎÓÈ 1"><circle cx="30.9" cy="30.9" r="30.9" fill="#485a69"></circle><path fill="#f9dca4" fillRule="evenodd" d="M23.242 38.592l15.92.209v12.918l-15.907-.121-.013-13.006z"></path><path fill="#d5e1ed" fillRule="evenodd" d="M53.478 51.993A30.814 30.814 0 0 1 30.9 61.8a31.225 31.225 0 0 1-3.837-.237A30.699 30.699 0 0 1 15.9 57.919a31.033 31.033 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 4.535 1.84 6.152 7.97 6.244 7.57.113 7.94-1.606 7.94-6.28l12.79 6.281z"></path><path fillRule="evenodd" d="M39.165 38.778v3.404c-2.75 4.914-14 4.998-15.923-3.59z" opacity=".11"></path><path fill="#ffe8be" fillRule="evenodd" d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z"></path><path fill="#f9dca4" fillRule="evenodd" d="M18.365 24.045c-3.07 1.34-.46 7.687 1.472 7.658a31.973 31.973 0 01-1.472-7.658zM44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.992 31.992 0 001.471-7.658z"></path><path fill="#ecbe6a" fillRule="evenodd" d="M43.409 29.584s1.066-8.716-2.015-11.752c-1.34 3.528-7.502 4.733-7.502 4.733a16.62 16.62 0 0 0 3.215-2.947c-1.652.715-6.876 2.858-11.61 1.161a23.715 23.715 0 0 0 3.617-2.679s-4.287 2.322-8.44 1.742c-2.991 2.232-1.66 9.162-1.66 9.162C15 18.417 18.697 6.296 31.39 6.226c12.358-.069 16.17 11.847 12.018 23.358z"></path><path fill="#fff" fillRule="evenodd" d="M23.255 42.179a17.39 17.39 0 0 0 7.958 6.446l-5.182 5.349L19.44 43.87z"></path><path fill="#fff" fillRule="evenodd" d="M39.16 42.179a17.391 17.391 0 0 1-7.958 6.446l5.181 5.349 6.592-10.103z"></path><path fill="#3dbc93" fillRule="evenodd" d="M33.366 61.7q-1.239.097-2.504.098-.954 0-1.895-.056l1.031-8.757h2.41z"></path><path fill="#3dbc93" fillRule="evenodd" d="M28.472 51.456l2.737-2.817 2.736 2.817-2.736 2.817-2.737-2.817z"></path></g></g></svg>
                      </div>
                  }
                </div>
                <div> { auth && auth?.username} </div>
              </div>
              <div> {auth && auth?.email} </div>
            </div>
          <div className="h-full flex flex-col-reverse overflow-scroll overflow-x-hidden custom-scroll">
              <ul>
                {
                  isMessages && isMessages.length > 0 ? isMessages.map((message: any, i: number) => (
                    <li className={`flex ${ auth && auth._id === message.sender._id ? "justify-end" : "justify-start" } gap-3 pb-3 items-end`} key={i} >
                      <span className={`text-xl rounded-lg py-2 px-4 ${auth && auth._id === message.sender._id ? "bg-green-300 dark:bg-teal-500" : "bg-orange-200 dark:bg-red-500"}`}>
                        {message.content}
                      </span>
                    </li>
                  )) :
                  <li className="flex justify-center gap-3 pb-3 items-end" > 
                    <span className="text-sm rounded-lg py-1 px-2">
                      No messages
                    </span>
                  </li>
                }
                <li className="flex justify-start gap-3 pb-3 items-end "> 
                    <span className="text-xl rounded-lg py-1 px-2 bg-orange-200 dark:bg-red-500">
                      hiiii
                    </span>
                </li>
             
              </ul>
          </div>
          <div className='mb-5 md:mb-2 lg:mb-0'>
              <label htmlFor="default-search" className="mb-2 text-xl font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                <input value={newMessage} onChange={(e) => typingHandler(e.target.value)} type="text" className="block w-full p-4 text-xl text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Message here..." required />
                {
                  newMessage && <div onClick={() => handleSendMessage()} className='absolute right-3.5 bottom-4'>
                    <FiSend className="text-2xl text-light_primary dark:text-dark_primary cursor-pointer" />
                  </div>
                }
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero