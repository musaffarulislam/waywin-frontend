import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";  
import bluelogo from "../../assets/bluelogo.png";
import redlogo from "../../assets/redlogo.png";
import NavbarTheme from "../../components/Navbars/NavbarTheme";
import FormOtp from "../../components/Forms/FormOtp";
import "../../styles/modules/Scroll.scss";
import { Link } from "react-router-dom";
import { loading } from "../../app/slices/authSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

const Otp: FC = () => {

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const theme: string = useSelector((state: any) => state.theme.theme);
  useEffect(()=>{
    dispatch(loading(false))
  },[dispatch])

  return (
    <div className="flex-wrap md:flex h-screen relative overflow-auto custom-scroll">
      <NavbarTheme />
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-3/4 sm:w-2/4 md:w-8/12 my-12">
          <Link to="/">
            <img src={theme === "dark" ? redlogo : bluelogo} alt="Logo" />
          </Link>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center md:justify-start">
        <div className="bg-slate-400 dark:bg-slate-800 bg-opacity-50 w-3/4 sm:w-1/2 md:w-3/4 p-8 md:py-28 rounded-3xl">
          <div className="flex items-center justify-center py-8 text-5xl font-bold">
              One-Time Password
          </div>
          <FormOtp />
        </div>
      </div>
    </div>
  );
};

export default Otp;
