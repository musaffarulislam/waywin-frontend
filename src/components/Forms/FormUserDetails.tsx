import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "../Inputs/InputText";
import signupSchema from "../../utils/validation/signupValidation";
import useToaster from '../../hooks/useToast';
import { IAuth } from "../../utils/entity/AuthEntity";
import { Puff } from 'react-loading-icons'


const schema = signupSchema;


const FormUserDetails = () => {
  
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<IAuth>({ resolver: yupResolver(schema) });

  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const toaster = useToaster();

  const auth: IAuth = useSelector((state: any)=> state.auth.auth)

  useEffect(() => {
    if (auth) {
      setValue("username", auth.username);
      setValue("email", auth.email);
      setValue("phoneNumber", auth.phoneNumber);
    }
  }, [auth, setValue]);

  const username = watch("username");

  useEffect(() => {
    if (auth && username !== auth.username) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [username, auth]);

  const onSubmit = async (data: IAuth) => {
    setIsEditing(false);
  };
  
  const isLoading: boolean = useSelector((state: any) => state.auth.isLoading);



  return (
    <form className="rounded flex flex-col pb-8 gjustify-center w-3/4 md:w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-center pb-4 text-3xl font-bold">
        Personal Details
      </div>
      <InputText label="Username" name="username" type="text" register={register} required error={errors.username?.message}  />
      <InputText label="Email" name="email" type="text" register={register} required error={errors.email?.message} disabled/>
      <InputText label="Phone Number" name="phoneNumber" type="text" register={register} required error={errors.phoneNumber?.message} disabled />

      {isEditing && 
        <div className="flex justify-center">
          <button
            type={!isLoading ? "submit" : "button"}
            className="bg-red-600 text-white dark:bg-blue-800 w-5/12 p-3 mt-8 rounded-xl text-2xl flex items-center justify-center"
          >
            {isLoading && <Puff height="25" width="25" className="me-3" />}
            Submit
          </button>
        </div>
      }
    </form>
  );
};

export default FormUserDetails;
