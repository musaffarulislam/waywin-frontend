import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "../Inputs/InputText";
import { useNavigate } from "react-router-dom";
import signupSchema from "../../utils/validation/signupValidation";
import useToaster from '../../hooks/useToast';
import { IAuth } from "../../utils/entity/AuthEntity";
import { Puff } from 'react-loading-icons'
import { ITrainerInfo } from "../../utils/entity/TrainerEntity";
import InputCheckbox from "../Inputs/InputCheckbox";


const schema = signupSchema;


const FormTrainerProfile = () => {
  
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<IAuth>({ resolver: yupResolver(schema) });


  const trainerInfo : ITrainerInfo | null = useSelector((state:any) => state.trainer.trainerInfo);

  const onSubmit = async (data: IAuth) => {
    console.log(data);
  };
  
  const isLoading: boolean = useSelector((state: any) => state.auth.isLoading);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const handleRole = (option: string[]) => {
    setSelectedServices(option);
  };

  return (
    <form className="rounded flex flex-col justify-center w-3/4 md:w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-center pb-8 text-3xl font-bold">
        Profile
      </div>
      <InputCheckbox onOptionServices={handleRole} />
      <InputText label="Username" name="username" type="text" register={register} required error={errors.username?.message}  />
      <InputText label="Email" name="email" type="text" register={register} required error={errors.email?.message} disabled/>
      <InputText label="Phone Number" name="phoneNumber" type="text" register={register} required error={errors.phoneNumber?.message} disabled />
        <div className="flex justify-center">
          <button type={!isLoading ? "submit" : "button"}
            className="bg-red-600 text-white dark:bg-blue-800 w-5/12 p-3 mt-8 rounded-xl text-2xl flex items-center justify-center"
          >
            {isLoading && <Puff height="25" width="25" className="me-3" />}
            Submit
          </button>
        </div>
    </form>
  );
};

export default FormTrainerProfile;
