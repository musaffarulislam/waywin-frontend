import React, { ReactEventHandler, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import useToaster from '../../hooks/useToast';
import { Puff } from 'react-loading-icons';
import textareaValidation from "../../utils/validation/textareaValidation";
import { IBooking, IProfile } from "../../utils/entity/TrainerEntity";
import { createProfile, getTrainerProfile } from "../../app/slices/trainerSlice";
import InputServices from "../Inputs/BookingInputs/InputServices";
import InputMode from "../Inputs/BookingInputs/InputMode";


const textareaSchema = textareaValidation;

const FormBooking = ({trainerInfo}: any) => {
  
  const { register, setValue, formState: { errors }, watch } = useForm<IProfile>();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  
  const isLoading: boolean = useSelector((state: any) => state.auth.isLoading);

  const toaster = useToaster()
  
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedMode, setSelectedMode] = useState<string[]>([]);
  
  const [errorsServices, setErrorsServices] = useState<string>();
  const [errorsMode, setErrorsMode] = useState<string>();

  const handleServices = useCallback((option: string) => {
    // if(option !== ""){
      setSelectedServices([option]);
    // }else{
    //   setErrorsServices("Please select any services")
    // }
  },[]);

  const handleMode = useCallback((option: string) => {
    // if(option !== ""){
      setSelectedMode([option]);
      // setErrorsServices("")
    // }else{
    //   setErrorsServices("Please select any modes")
    // }
  },[]);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let formData: IBooking = {
      services: [],
      mode: []
    };
    formData.services = selectedServices;
    formData.mode = selectedMode;


    if(selectedServices[0] === "" || selectedServices.length <= 0){
      return setErrorsServices("Please select any services")
    }else{
      setErrorsServices("")
    }

    if(selectedMode[0] === "" || selectedMode.length <= 0){
      return setErrorsMode("Please select any mode")
    }else{
      setErrorsMode("")
    }

    // dispatch(createProfile(formData))
    toaster.showToast('Book Successfully', { type: 'success' })
  }

  


  return (
    <form className="rounded flex flex-col justify-center w-3/4 md:w-full" onSubmit={handleSubmitForm}>
      <div className="flex items-center justify-center pb-8 text-3xl font-bold">
        Booking
      </div>
      <InputServices onOptionServices={handleServices} error={errorsServices} services={trainerInfo?.profile?.services} />
      <InputMode onOptionMode={handleMode} error={errorsMode} modes={trainerInfo?.profile?.mode} />
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

export default FormBooking;
