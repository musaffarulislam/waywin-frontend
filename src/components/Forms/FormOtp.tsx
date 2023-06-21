import { Link, useNavigate } from "react-router-dom";
import OtpForm from "../Otp/OtpForm";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { otpConfirmObj } from "../../app/slices/authSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import useToaster from '../../hooks/useToast';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";

// import setUpRecaptcha from "../../context/userAuthContext";

const FormLogin = () => {

  const [timer, setTimer] = useState(60);
  const phoneNumber: string | null = useSelector((state: any) => state.auth.auth.phoneNumber);

  function setUpRecaptcha(number: string) {
    try{
      console.log("recapcha")
      const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth
        );
        recaptchaVerifier.render();
        console.log("recapcha render")
      return signInWithPhoneNumber(auth, number, recaptchaVerifier)
    }catch(error: any){
      throw new Error(error.message)
    }
  }
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
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
    if (phoneNumber) {
      try {
        const response = await setUpRecaptcha("+91" + phoneNumber);
        console.log("Form Otp : ",response)
        dispatch(otpConfirmObj(response));
        navigate("/otp");
      } catch (err: any) {
        if (err.code === "auth/credential-already-in-use") {
          toaster.showToast('Phone number already in use', { type: 'error' })
        } else if (err.code === "auth/invalid-phone-number") {
          toaster.showToast('Invalid phone number', { type: 'error' })
        } else {
          toaster.showToast('Failed to send OTP code', { type: 'error' })
        }
      }
    } else {
      toaster.showToast('Phone number not available', { type: 'error' })
    }
  };


return (
  <div className="rounded flex flex-col justify-center">
    <OtpForm />
    <div className="flex justify-center">
      <div className="my-2" id="recaptcha-container"></div>
    </div>
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
