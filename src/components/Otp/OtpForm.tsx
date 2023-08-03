import React, { useState } from "react";
import OtpInput from "./OtpInput";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import { createUser } from "../../app/slices/authSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import useToaster from '../../hooks/useToast';

interface ConfirmObj {
  confirm: (otp: string) => Promise<any>;
}

const OtpForm = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const toaster = useToaster();

  const phoneNumber: string | null = useSelector((state: any) => state.auth.auth.phoneNumber);
  const confirmObj: ConfirmObj = useSelector((state: any) => state.auth.confirmObj);

  let navigate = useNavigate();
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    try {
      await confirmObj.confirm(otp);
      try {
        dispatch(createUser());
        navigate('/login')
      } catch (error: any) {
        toaster.showToast(error.message, { type: 'error' }) 
        return navigate('/otp'); 
      }
    } catch (e: any) {
      toaster.showToast(e, {type: "error"})
      if (e instanceof Error) {
        setError(true);
      }
    } 
    navigate('/login')
  };



  if (message) {
    return (
      <div className="flex flex-col items-stretch gap-2">
        <p className="text-xl">{message}</p>
        <button
          onClick={() => {
            setMessage("");
            setOtp("");
          }}
          className="btn btn-primary"
        >
          Reset Form
        </button>
      </div>
    );
  }

  if(phoneNumber){
    return (
        <form className="card bg-base-200" onSubmit={handleSubmit}>
          <div className="card-body items-stretch text-center">
            <div className="my-8">
              <h2 className="text-xl mb-8"> An OTP has been sent to your entered mobile number +91-{phoneNumber}</h2>
              <p className="text-sm">Enter your Code here</p>
            </div>
            <OtpInput
              value={otp}
              onChange={(val) => {
                setOtp(val);
              }}
            />
            {error && <p className="text-lg text-red-500 mt-2">Please enter correct otp</p>}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-red-600 dark:bg-blue-800 text-white w-5/12 p-3 my-8 rounded-xl text-2xl"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
    );
  }else{
    return <Navigate to='/signup'/>
  }
};

export default OtpForm;