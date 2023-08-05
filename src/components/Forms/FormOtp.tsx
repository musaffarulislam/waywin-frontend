import { Link } from "react-router-dom";
import OtpForm from "../Otp/OtpForm";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { loading, otpGenerate } from "../../app/slices/authSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import useToaster from '../../hooks/useToast'; 
// import setUpRecaptcha from "../../context/userAuthContext";

const FormLogin = () => {

  const [timer, setTimer] = useState(60);
  const email: string | null  = useSelector((state: any) => state.auth.auth.email);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>(); 
  const toaster = useToaster();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);


  const handleResendOTP = async (): Promise<void> => {
    setTimer(60);
    if (email) {
      try {
        dispatch(otpGenerate(email)) 
        toaster.showToast('Otp send successsful', { type: 'success' })
        dispatch(loading(false));
      } catch (err: any) {
        toaster.showToast(err.message, { type: 'error' }); 
      }
    } else {
      toaster.showToast('Email not available', { type: 'error' })
    }
  };


return (
  <div className="rounded flex flex-col justify-center">
    <OtpForm /> 
    <div className="flex justify-center">
      <div className="flex justify-between w-5/12">
        <div className="flex">
          {timer > 0 ? (
            <p>Resend OTP in {timer} seconds</p>
          ) : (
            <button onClick={handleResendOTP}>Resend OTP</button>
          )}
        </div>
        <Link to="/signup">back</Link>
      </div>
    </div>
  </div>
);
};

export default FormLogin;
