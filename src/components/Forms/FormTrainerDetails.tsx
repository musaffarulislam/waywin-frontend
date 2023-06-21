import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "../Inputs/InputText";
import { Link, useNavigate } from "react-router-dom";
import InputRadio from "../Inputs/InputRadio";
import signupSchema from "../../utils/validation/signupValidation";
import { addAuth, checkEmail, checkUsername, otpConfirmObj, loading, checkPhoneNumber } from "../../app/slices/authSlice";
import useToaster from '../../hooks/useToast';
import { IAuth } from "../../utils/entity/AuthEntity";
import { Puff } from 'react-loading-icons'
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../firebase";

import setUpRecaptcha from "../../context/userAuthContext";

const schema = signupSchema;


const FormTrainerDetails = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IAuth>({ resolver: yupResolver(schema) });

  
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const toaster = useToaster();
  
  

  const onSubmit = async (data: IAuth) => {
 
  };

  const theme: string = useSelector((state: any) => state.theme.theme);
  const isLoading: boolean = useSelector((state: any) => state.auth.isLoading)




  return (
    <form className="rounded flex flex-col justify-center w-3/4 md:w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-center pb-4 text-3xl font-bold">
            Personal Details
      </div>
      <InputText label="Username" name="username" type="text" register={register} required error={errors.username?.message}/>
      <InputText label="Email" name="email" type="text" register={register} required error={errors.email?.message} />
      <InputText label="Phone Number" name="phoneNumber" type="text" register={register} required error={errors.phoneNumber?.message} />

      <div className="flex justify-center">
        <button
          type={!isLoading ? "submit" : "button"}
          className="bg-red-600 text-white dark:bg-blue-800 w-5/12 p-3 mt-8 rounded-xl text-2xl flex items-center justify-center"
        >
          {isLoading && <Puff height="25" width="25" className="me-3" />}
          Submit
        </button>
      </div>
    </form>
  );
};

export default FormTrainerDetails;