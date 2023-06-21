import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputText from "../Inputs/InputText";
import { Link, useNavigate } from "react-router-dom";
import { addAuth, getAuthByEmail, loading, otpConfirmObj } from "../../app/slices/authSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { ILogin } from "../../utils/entity/AuthEntity";
import { Puff } from "react-loading-icons";
import useToaster from '../../hooks/useToast';

const schema = yup.object({
    email: yup
      .string()
      .required("Email is required.")
      .email("Invalid email format."),
    password: yup
      .string()
      .required("Password is required.")
      .matches(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]+$/,
        "Password must be at least 6 characters long and include letter, number and special character"
      )
      .min(6, "Password must be at least 6 characters long"),
  }).required();

  
const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(schema)
  });

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate()
  const toaster = useToaster();

  const accessToken: string = useSelector((state: any) => state.auth.accessToken);
  const isLoading: boolean = useSelector((state: any)=> state.auth.isLoading);
  const role: string | null = useSelector((state: any) => state.auth.role);
  
  const onSubmit = async (data: ILogin) => {
    try{
      await dispatch(getAuthByEmail(data))
    }catch(error: any){
      dispatch(loading(false))
      toaster.showToast(error.message, { type: 'error' });
      console.log(error.message)
    }
  };
  
  useEffect(()=>{
    if(accessToken){
      if(role === "Trainer"){
        navigate('/trainer')
      }
  
      if(role === "User"){
        navigate('/')
      }
    }
  },[role, navigate ,accessToken])

  useEffect(()=>{
    dispatch(loading(false));
    dispatch(addAuth(null))
    dispatch(otpConfirmObj(null))
  },[dispatch])

  return (
    <form className="rounded flex flex-col justify-center" onSubmit={handleSubmit(onSubmit)}>
        <InputText label="Email" name="email" type="text" register={register} required error={errors.email?.message} />
        <InputText label="Password" name="password" type="password" register={register} required error={errors.password?.message} />
        <div className="flex justify-center">
        <button type="submit" className="bg-red-600 text-white dark:bg-blue-800 w-5/12 p-3 mt-8 rounded-xl text-2xl flex items-center justify-center"> {isLoading && <Puff height="25" width="25" className="me-3"/>}Submit</button>
        </div>
        <div className="flex justify-center my-8">
          <Link to='/signup'>Create new account?</Link>
        </div>
    </form>
  );
};

export default FormLogin;
