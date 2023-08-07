import React, { useEffect, useState } from "react";
import {  getAllMessages, getTrainerInfo, sendMessage } from "../../../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { FiSend } from "react-icons/fi"; 
import "../../../styles/modules/Scroll.scss";
import { useNavigate, useParams } from "react-router-dom"; 
import { getAuthInfo } from "../../../app/slices/authSlice";
import { IAuth } from "../../../utils/entity/AuthEntity";

import io from "socket.io-client";
import Lottie from "react-lottie";
import useToaster from "../../../hooks/useToast";
const ENDPOINT: string = "https://waywin.server.musaffarulislam.com" || "https://www.waywin.server.musaffarulislam.com"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket: any, selectedChatId: string | undefined;

const Hero = () => {

  const { trainerId, chatId } = useParams()
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate()
  const toaster = useToaster()
  const [isMessages, setIsMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState<string>("") 

  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  
  const auth: IAuth = useSelector((state: any)=> state.auth.auth)
  const trainerInfo = useSelector((state: any)=> state.user.trainerInfo)

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: {"v":"5.5.2","fr":60,"ip":0,"op":104,"w":84,"h":40,"nm":"Typing-Indicator","ddd":0,"assets":[],"layers":[{"ddd":0,"ind":1,"ty":4,"nm":"Oval 3","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.643],"y":[1]},"o":{"x":[1],"y":[0]},"t":18,"s":[35],"e":[100]},{"i":{"x":[0.099],"y":[1]},"o":{"x":[0.129],"y":[0]},"t":33,"s":[100],"e":[35]},{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.167],"y":[0]},"t":65,"s":[35],"e":[35]},{"t":71}],"ix":11,"x":"var $bm_rt;\n$bm_rt = loopOut('cycle', 0);"},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[61,20,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.667,0.667,0.667],"y":[1,1,1]},"o":{"x":[1,1,0.333],"y":[0,0,0]},"t":18,"s":[100,100,100],"e":[140,140,100]},{"i":{"x":[0.032,0.032,0.667],"y":[1,1,1]},"o":{"x":[0.217,0.217,0.333],"y":[0,0,0]},"t":33,"s":[140,140,100],"e":[100,100,100]},{"i":{"x":[0.833,0.833,0.833],"y":[1,1,1]},"o":{"x":[0.167,0.167,0.167],"y":[0,0,0]},"t":65,"s":[100,100,100],"e":[100,100,100]},{"t":71}],"ix":6,"x":"var $bm_rt;\n$bm_rt = loopOut('cycle', 0);"}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[12,12],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"fl","c":{"a":0,"k":[0.847000002861,0.847000002861,0.847000002861,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Oval 3","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":3600,"st":0,"bm":0},{"ddd":0,"ind":2,"ty":4,"nm":"Oval 2","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[1],"y":[0]},"t":9,"s":[35],"e":[98]},{"i":{"x":[0.023],"y":[1]},"o":{"x":[0.179],"y":[0]},"t":24,"s":[98],"e":[35]},{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.167],"y":[0]},"t":56,"s":[35],"e":[35]},{"t":62}],"ix":11,"x":"var $bm_rt;\n$bm_rt = loopOut('cycle', 0);"},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[41,20,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.654,0.654,0.667],"y":[1,1,1]},"o":{"x":[1,1,0.333],"y":[0,0,0]},"t":9,"s":[100,100,100],"e":[140,140,100]},{"i":{"x":[0.11,0.11,0.667],"y":[1,1,1]},"o":{"x":[0.205,0.205,0.333],"y":[0,0,0]},"t":24,"s":[140,140,100],"e":[100,100,100]},{"i":{"x":[0.833,0.833,0.833],"y":[1,1,1]},"o":{"x":[0.167,0.167,0.167],"y":[0,0,0]},"t":56,"s":[100,100,100],"e":[100,100,100]},{"t":62}],"ix":6,"x":"var $bm_rt;\n$bm_rt = loopOut('cycle', 0);"}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[12,12],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"fl","c":{"a":0,"k":[0.847000002861,0.847000002861,0.847000002861,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Oval 2","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":3600,"st":0,"bm":0},{"ddd":0,"ind":3,"ty":4,"nm":"Oval 1","sr":1,"ks":{"o":{"a":1,"k":[{"i":{"x":[0.667],"y":[1]},"o":{"x":[1],"y":[0]},"t":0,"s":[35],"e":[100]},{"i":{"x":[0.067],"y":[1]},"o":{"x":[0.125],"y":[0]},"t":15,"s":[100],"e":[35]},{"i":{"x":[0.833],"y":[1]},"o":{"x":[0.167],"y":[0]},"t":47,"s":[35],"e":[35]},{"t":53}],"ix":11,"x":"var $bm_rt;\n$bm_rt = loopOut('cycle', 0);"},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[21,20,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":1,"k":[{"i":{"x":[0.673,0.673,0.667],"y":[1,1,1]},"o":{"x":[1,1,0.333],"y":[0,0,0]},"t":0,"s":[100,100,100],"e":[140,140,100]},{"i":{"x":[0.049,0.049,0.667],"y":[1,1,1]},"o":{"x":[0.198,0.198,0.333],"y":[0,0,0]},"t":15,"s":[140,140,100],"e":[100,100,100]},{"i":{"x":[0.833,0.833,0.833],"y":[1,1,1]},"o":{"x":[0.167,0.167,0.167],"y":[0,0,0]},"t":47,"s":[100,100,100],"e":[100,100,100]},{"t":53}],"ix":6,"x":"var $bm_rt;\n$bm_rt = loopOut('cycle', 0);"}},"ao":0,"shapes":[{"ty":"gr","it":[{"d":1,"ty":"el","s":{"a":0,"k":[12,12],"ix":2},"p":{"a":0,"k":[0,0],"ix":3},"nm":"Ellipse Path 1","mn":"ADBE Vector Shape - Ellipse","hd":false},{"ty":"fl","c":{"a":0,"k":[0.847000002861,0.847000002861,0.847000002861,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"Oval 1","np":2,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":3600,"st":0,"bm":0},{"ddd":0,"ind":4,"ty":4,"nm":"BG","sr":1,"ks":{"o":{"a":0,"k":100,"ix":11},"r":{"a":0,"k":0,"ix":10},"p":{"a":0,"k":[42,20,0],"ix":2},"a":{"a":0,"k":[0,0,0],"ix":1},"s":{"a":0,"k":[100,100,100],"ix":6}},"ao":0,"shapes":[{"ty":"gr","it":[{"ind":0,"ty":"sh","ix":1,"ks":{"a":0,"k":{"i":[[0,0],[0,0],[0,0],[0,0]],"o":[[0,0],[0,0],[0,0],[0,0]],"v":[[-42,-20],[42,-20],[42,20],[-42,20]],"c":true},"ix":2},"nm":"Path 1","mn":"ADBE Vector Shape - Group","hd":false},{"ty":"rd","nm":"Round Corners 1","r":{"a":0,"k":20,"ix":1},"ix":2,"mn":"ADBE Vector Filter - RC","hd":false},{"ty":"fl","c":{"a":0,"k":[0.96078401804,0.96078401804,0.96078401804,1],"ix":4},"o":{"a":0,"k":100,"ix":5},"r":1,"bm":0,"nm":"Fill 1","mn":"ADBE Vector Graphic - Fill","hd":false},{"ty":"tr","p":{"a":0,"k":[0,0],"ix":2},"a":{"a":0,"k":[0,0],"ix":1},"s":{"a":0,"k":[100,100],"ix":3},"r":{"a":0,"k":0,"ix":6},"o":{"a":0,"k":100,"ix":7},"sk":{"a":0,"k":0,"ix":4},"sa":{"a":0,"k":0,"ix":5},"nm":"Transform"}],"nm":"BG","np":3,"cix":2,"bm":0,"ix":1,"mn":"ADBE Vector Group","hd":false}],"ip":0,"op":3600,"st":0,"bm":0}],"markers":[]},
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

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

  useEffect(() => {
    socket = io(ENDPOINT);
    if (auth) {
      socket.emit("setup", auth);
    }
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, [auth]);

  useEffect(() => { 
      const fetchData = async () => { 
          const {payload} = await dispatch(getAllMessages(chatId));
          setIsMessages(payload) 
          socket.emit("join chat", chatId); 
      };
      fetchData(); 
      console.log("User 3")
      selectedChatId = chatId; 
  }, [dispatch, chatId])

  useEffect(() => {
    socket.on("message received", (newMessageRecieved: any) => { 
      if ( !selectedChatId || selectedChatId !== newMessageRecieved.chat._id ) {
        console.log("Something went wrong")
      }else{
        console.log("User 1")
        setIsMessages((prevMessages) => [...prevMessages, newMessageRecieved])
      }
    });
  },[])
  
  useEffect(()=>{ 
      dispatch(getTrainerInfo(trainerId)) 
  },[dispatch, trainerId])
  
  const handleTrainer = () => {
    navigate(`/trainer-info/${trainerId}`);
  }

  const typingHandler = (value: string) =>{
    setNewMessage(value)

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", chatId);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 2000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", chatId);
        setTyping(false);
      }
    }, timerLength);
  } 

    
  const handleSendMessage = async () => {
    try{
      if (newMessage) {
        socket.emit("stop typing", chatId);
        const result = await dispatch(sendMessage({ newMessage, chatId }));
        const payload = result.payload;   
        socket.emit("new message", payload);
        setIsMessages([...isMessages, payload]); 
        setNewMessage("")
      }
    } catch (error: any) { 
      toaster.showToast(error.message, { type: 'error' })
    }
  };

  return (
    <div className='px-6 sm:px-14 md:px-40 lg:px-64 mx-auto pt-16 pb-8 max-w-screen-xl h-screen'>
      <div className="pt-12 h-full">
        <div className="relative h-full overflow-hidden p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 flex flex-col ">
            <div className="text-primary_dark flex justify-between items-center px-10 py-3 bg-slate-50 shadow-2xl rounded-xl cursor-pointer" onClick={handleTrainer}>
              <div className="flex items-center gap-2 text-xl">
                <div className="inset-0 flex flex-col items-center justify-start w-12 h-12  rounded-2xl ">
                  { trainerInfo && trainerInfo?.profileImage?.url ?
                      <>
                        <img src={trainerInfo?.profileImage.url} alt="Preview" className="w-full h-full object-cover  rounded-full" />      
                      </>
                    :
                    <div className="w-full h-full object-contain rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.8 61.8" id="avatar"><g data-name="Layer 2"><g data-name="—ÎÓÈ 1"><circle cx="30.9" cy="30.9" r="30.9" fill="#485a69"></circle><path fill="#f9dca4" fillRule="evenodd" d="M23.242 38.592l15.92.209v12.918l-15.907-.121-.013-13.006z"></path><path fill="#d5e1ed" fillRule="evenodd" d="M53.478 51.993A30.814 30.814 0 0 1 30.9 61.8a31.225 31.225 0 0 1-3.837-.237A30.699 30.699 0 0 1 15.9 57.919a31.033 31.033 0 0 1-7.857-6.225l1.284-3.1 13.925-6.212c0 4.535 1.84 6.152 7.97 6.244 7.57.113 7.94-1.606 7.94-6.28l12.79 6.281z"></path><path fillRule="evenodd" d="M39.165 38.778v3.404c-2.75 4.914-14 4.998-15.923-3.59z" opacity=".11"></path><path fill="#ffe8be" fillRule="evenodd" d="M31.129 8.432c21.281 0 12.987 35.266 0 35.266-12.267 0-21.281-35.266 0-35.266z"></path><path fill="#f9dca4" fillRule="evenodd" d="M18.365 24.045c-3.07 1.34-.46 7.687 1.472 7.658a31.973 31.973 0 01-1.472-7.658zM44.14 24.045c3.07 1.339.46 7.687-1.471 7.658a31.992 31.992 0 001.471-7.658z"></path><path fill="#ecbe6a" fillRule="evenodd" d="M43.409 29.584s1.066-8.716-2.015-11.752c-1.34 3.528-7.502 4.733-7.502 4.733a16.62 16.62 0 0 0 3.215-2.947c-1.652.715-6.876 2.858-11.61 1.161a23.715 23.715 0 0 0 3.617-2.679s-4.287 2.322-8.44 1.742c-2.991 2.232-1.66 9.162-1.66 9.162C15 18.417 18.697 6.296 31.39 6.226c12.358-.069 16.17 11.847 12.018 23.358z"></path><path fill="#fff" fillRule="evenodd" d="M23.255 42.179a17.39 17.39 0 0 0 7.958 6.446l-5.182 5.349L19.44 43.87z"></path><path fill="#fff" fillRule="evenodd" d="M39.16 42.179a17.391 17.391 0 0 1-7.958 6.446l5.181 5.349 6.592-10.103z"></path><path fill="#3dbc93" fillRule="evenodd" d="M33.366 61.7q-1.239.097-2.504.098-.954 0-1.895-.056l1.031-8.757h2.41z"></path><path fill="#3dbc93" fillRule="evenodd" d="M28.472 51.456l2.737-2.817 2.736 2.817-2.736 2.817-2.737-2.817z"></path></g></g></svg>
                      </div>
                  }
                </div>
                <div> { trainerInfo && trainerInfo?.authId?.username} </div>
              </div>
              <div className="hidden sm:block"> {trainerInfo && trainerInfo?.authId?.email} </div>
            </div>
          <div className="h-full flex flex-col-reverse overflow-scroll overflow-x-hidden custom-scroll">
              <ul>
                {
                  isMessages && isMessages.length > 0 ? isMessages.map((message: any, i: number) => (
                    <li className={`flex ${ auth && auth._id === message.sender._id ? "justify-end" : "justify-start" } gap-3 pb-3 items-end`} key={i} >
                      <span className={`text-xl max-w-4xl rounded-lg py-2 px-4 ${auth && auth._id === message.sender._id ? "bg-green-300 dark:bg-teal-500" : "bg-orange-200 dark:bg-red-500"}`}>
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
              {istyping ? (
                <li>
                  <Lottie
                    options={defaultOptions} 
                    width={40}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </li>
              ) : (
                <></>
              )}
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