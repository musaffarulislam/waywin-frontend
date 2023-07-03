import React, { ReactEventHandler, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "../Inputs/InputText";
import profileSchemaValidation from "../../utils/validation/signupValidation";
import useToaster from '../../hooks/useToast';
import { Puff } from 'react-loading-icons';
import InputServices from "../Inputs/InputServices";
import InputTextarea from "../Inputs/InputTextarea";
import textareaValidation from "../../utils/validation/textareaValidation";
import InputTags from "../Inputs/InputTags";
import { IProfile } from "../../utils/entity/TrainerEntity";
import InputMode from "../Inputs/InputMode";
import { createProfile, getTrainerProfile } from "../../app/slices/trainerSlice";


const profileSchema = profileSchemaValidation;
const textareaSchema = textareaValidation;

const FormTrainerProfile = () => {
  
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<IProfile>();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  
  const isLoading: boolean = useSelector((state: any) => state.auth.isLoading);

  const toaster = useToaster()
  
  const profileInfo = useSelector((state:any) => state.trainer.profileInfo)
  
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [profileDescription, setProfileDescription] = useState<string>();
  const [selectedMode, setSelectedMode] = useState<string[]>([]);
  
  const [errorsServices, setErrorsServices] = useState<string>();
  const [errorsDescription, setErrorsDescription] = useState<string>();
  const [errorsTags, setErrorsTags] = useState<string>();
  const [errorsExperience, setErrorsExperience] = useState<string>();
  const [errorsMode, setErrorsMode] = useState<string>();

  useEffect(() => {
    if (profileInfo) {
      setValue("experience", profileInfo.experience);
    }
  }, [profileInfo, setValue]);

  const handleServices = useCallback((option: string[]) => {
    setSelectedServices(option);
  },[]);
  
  const handleDescription = useCallback((text: string) => {
    textareaSchema.validate(text).then(()=>{
      setErrorsDescription(""); // No validation error
      console.log("Handle : ",text)
      setProfileDescription(text);
    })
    .catch((error) => {
      if (error.path === "_") {
        setErrorsDescription(error.message);
      } else {
        setErrorsDescription(error.errors[0]);
      }
    });
  },[]);
  
  const handleTags = useCallback((tags: string[]) => {
    setSelectedTags(tags);
  },[]);

  const experience = watch("experience");

  const handleMode = useCallback((option: string[]) => {
    setSelectedMode(option);
  },[]);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let formData: IProfile = {
      services: [],
      description: profileDescription,
      tags: [],
      experience: 0,
      mode: []
    };
    formData.services = selectedServices;
    formData.description = profileDescription;
    formData.tags = selectedTags;
    formData.experience = experience;
    formData.mode = selectedMode;
    console.log("profileDescription :",profileDescription)
    if(selectedServices.length <= 0){
      return setErrorsServices("Please select any services")
    }else{
      setErrorsServices("")
    }
    
    if(profileDescription === undefined){
      return setErrorsDescription("Description required")
    }else{
      setErrorsDescription("")
    }
    
    if(selectedTags.length <= 0){
      return setErrorsTags("Please select any tag")
    }else{
      setErrorsTags("")
    }
    
    if(experience < 0 || experience > 50){
      return setErrorsExperience("Please enter correct experience in year")
    }else{
      setErrorsExperience("")
    }

    if(selectedMode.length <= 0){
      return setErrorsMode("Please select any mode")
    }else{
      setErrorsMode("")
    }
    dispatch(createProfile(formData))
    toaster.showToast('Profile Update Successfully', { type: 'success' })
  }

  


  return (
    <form className="rounded flex flex-col justify-center w-3/4 md:w-full" onSubmit={handleSubmitForm}>
      <div className="flex items-center justify-center pb-8 text-3xl font-bold">
        Profile
      </div>
      <InputServices onOptionServices={handleServices} error={errorsServices}/>
      <InputTextarea label="Description" name="description" onTextDescription={handleDescription} error={errorsDescription}  />
      <InputTags onTagsChange={handleTags} error={errorsTags} />
      <InputText label="Experience" name="experience" type="number" register={register} required error={errorsExperience}/>
      <InputMode onOptionMode={handleMode} error={errorsMode}/>
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
