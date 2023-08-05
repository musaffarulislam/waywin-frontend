import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "../Inputs/InputText";
import { Link, useNavigate } from "react-router-dom";
import InputRadio from "../Inputs/InputRadio";
import signupSchema from "../../utils/validation/signupValidation";
import { addAuth, checkEmail, checkUsername, otpConfirmObj, loading, checkPhoneNumber, otpGenerate } from "../../app/slices/authSlice";
import useToaster from '../../hooks/useToast';
import { IAuth } from "../../utils/entity/AuthEntity";
import { Puff } from 'react-loading-icons';

const schema = signupSchema;

const FormSignup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IAuth>({ resolver: yupResolver(schema) });

  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const toaster = useToaster();
  
  useEffect(()=>{
    dispatch(loading(false));
    dispatch(addAuth(null))
    dispatch(otpConfirmObj(null))
  },[dispatch])

  const onSubmit = async (data: IAuth) => {
    const { ...formData } = data;
    formData.role = selectedOption;
    dispatch(addAuth(formData));
    try {
      await Promise.all([
        dispatch(checkUsername(formData.username)),
        dispatch(checkEmail(formData.email)),
        dispatch(checkPhoneNumber(formData.phoneNumber))
      ]);
      if (formData.email) { 
          dispatch(loading(true));  
          dispatch(otpGenerate(formData.email))
          toaster.showToast('Otp send successsful', { type: 'success' })
          dispatch(loading(false));
          navigate("/otp"); 
      } else {
        toaster.showToast('Email not available', { type: 'error' })
      }
    } catch (error: any) {
      dispatch(loading(false))
      toaster.showToast(error.message, { type: 'error' });
    }
  };

  const theme: string = useSelector((state: any) => state.theme.theme);
  const isLoading: boolean = useSelector((state: any) => state.auth.isLoading)

  const [selectedOption, setSelectedOption] = useState("User");

  const handleRole = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <form className="rounded flex flex-col justify-center" onSubmit={handleSubmit(onSubmit)}>
      <InputRadio onOptionChange={handleRole} />
      <InputText label="Username" name="username" type="text" register={register} required error={errors.username?.message} />
      <InputText label="Email" name="email" type="text" register={register} required error={errors.email?.message} />
      <InputText label="Phone Number" name="phoneNumber" type="text" register={register} required error={errors.phoneNumber?.message} />
      <InputText label="Password" name="password" type="password" register={register} required error={errors.password?.message} />

      <div className="flex justify-center">
        <button
          type={isLoading ? "button" : "submit"}
          className={` ${theme === "dark" ? "bg-blue-800" : "bg-red-600 text-white"} w-5/12 p-3 mt-8 rounded-xl text-2xl flex items-center justify-center`}
        >
          {isLoading && <Puff height="25" width="25" className="me-3" />}
          Submit
        </button>
      </div>

      <div className="flex justify-center my-4">
        <Link to='/login'>Already have an account?</Link>
      </div>
      <div className="flex justify-center mb-8">
        <Link to='/'>Home</Link>
      </div>
    </form>
  );
};

export default FormSignup;