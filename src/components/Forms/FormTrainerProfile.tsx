import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { yupResolver } from "@hookform/resolvers/yup";
import InputText from "../Inputs/InputText";
import profileSchemaValidation from "../../utils/validation/signupValidation";
import useToaster from '../../hooks/useToast';
import { Puff } from 'react-loading-icons';
import InputCheckbox from "../Inputs/InputCheckbox";
import InputTextarea from "../Inputs/InputTextarea";
import textareaValidation from "../../utils/validation/textareaValidation";
import InputTags from "../Inputs/InputTags";
import { IProfile } from "../../utils/entity/TrainerEntity";


const profileSchema = profileSchemaValidation;
const textareaSchema = textareaValidation;

const FormTrainerProfile = () => {
  
  const { register, handleSubmit, setValue, formState: { errors }, watch } = useForm<IProfile>({ resolver: yupResolver(profileSchema) });

  
  const isLoading: boolean = useSelector((state: any) => state.auth.isLoading);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [profileDescription, setProfileDescription] = useState<string>();

  const [errorsDescription, setErrorsDescription] = useState<string>();
  const [errorsTags, setErrorsTags] = useState<string>();

  const handleRole = (option: string[]) => {
    setSelectedServices(option);
  };

  const handleDescription = (text: string) => {
    textareaSchema.validate(text).then(()=>{
      setErrorsDescription(""); // No validation error
      setProfileDescription(text);
    })
    .catch((error) => {
      if (error.path === "_") {
        setErrorsDescription(error.message);
      } else {
        setErrorsDescription(error.errors[0]);
      }
    });
  };

  const handleTags = (tags: string[]) => {
    setSelectedTags(tags);
    console.log("select : ",selectedTags)
  };


  const onSubmit = async (data: IProfile) => {
    const { ...formData } = data;
    console.log(formData)
    formData.services = selectedServices;
    formData.description = profileDescription;
    formData.tags = selectedTags;
    if(selectedTags.length <= 0){
      return setErrorsTags("Please select any tag")
    }else{
      setErrorsTags("")
    }
    console.log(formData)
  }

  return (
    <form className="rounded flex flex-col justify-center w-3/4 md:w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center justify-center pb-8 text-3xl font-bold">
        Profile
      </div>
      <InputCheckbox onOptionServices={handleRole} />
      <InputTextarea label="Description" name="description" onTextDescription={handleDescription} error={errorsDescription}  />
      <InputTags onTagsChange={handleTags} error={errorsTags} />
      <InputText label="Experience" name="experience" type="number" register={register} required error={errors.experience?.message}/>
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
