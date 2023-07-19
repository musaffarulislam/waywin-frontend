import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "../Inputs/InputText";
import feeSchema from "../../utils/validation/feeValidation";
import useToaster from '../../hooks/useToast';
import { IAuth, IFee } from "../../utils/entity/AuthEntity";
import { Puff } from 'react-loading-icons'
import { ITrainerFee, ITrainerInfo } from "../../utils/entity/TrainerEntity";
import { addTrainerFee } from "../../app/slices/trainerSlice";


const schema = feeSchema;


const FormTrainerFee = () => {
  
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<IFee>({ resolver: yupResolver(schema) });

  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const toaster = useToaster();

  const fee : ITrainerFee | null = useSelector((state:any) => state.trainer.fee);
  
  const consultingFee = watch("consultingFee");
  const trainingFee = watch("trainingFee");

    useEffect(() => {
      if (fee) {
        setValue("consultingFee", fee.consultingFee);
        setValue("trainingFee", fee.trainingFee);
      }
    }, [fee, setValue]);

  useEffect(() => {
    if (fee && (consultingFee !== fee.consultingFee || trainingFee !== fee.trainingFee)) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [consultingFee, trainingFee, fee]);

  const onSubmit = async (data: IFee) => {
    try{ 
      dispatch(addTrainerFee(data))
      toaster.showToast("Fee added success", { type: 'success' });
      setIsEditing(false);
    }catch(error : any){
      toaster.showToast(error.message, { type: 'error' });
    }
  };
  
  const isLoading: boolean = useSelector((state: any) => state.auth.isLoading);



  return (
    <form className="rounded flex flex-col justify-center w-3/4 md:w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-center pb-4 text-3xl font-bold">
        Fee
      </div>
      <InputText label="Consulting Fee" name="consultingFee" type="number" register={register} required error={errors.consultingFee?.message}  />
      <InputText label="Training Fee" name="trainingFee" type="number" register={register} required error={errors.trainingFee?.message}  />

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

export default FormTrainerFee;
