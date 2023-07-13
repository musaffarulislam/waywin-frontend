import React, {  useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import useToaster from '../../hooks/useToast';
import { Puff } from 'react-loading-icons';
import { IBooking, IDate } from "../../utils/entity/TrainerEntity";
import InputServices from "../Inputs/BookingInputs/InputServices";
import InputMode from "../Inputs/BookingInputs/InputMode";
import InputText from "../Inputs/InputText";
import { InputDate } from "../Inputs/BookingInputs/InputDate";
import { bookingTrainer, booking, loading } from "../../app/slices/userSlice";
import Swal from "sweetalert2";

import redlogo from "../../assets/redlogo.png";
import { IAuth } from "../../utils/entity/AuthEntity copy";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type formBookingProps ={
  trainerInfo: any,
  onOptionModal: (option: boolean)=> void;
}
const FormBooking = ({trainerInfo, onOptionModal}: formBookingProps) => {
  const { register, setValue, watch } = useForm<IBooking>();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate()
  
  const isLoading: boolean = useSelector((state: any) => state.user.isLoading);
  const auth: IAuth = useSelector((state: any)=> state.auth.auth)

  const toaster = useToaster()
  
  const [isFeeType, setIsFeeType] = useState<boolean>(false);
  
  const [selectedService, setSelectedService] = useState<string[]>([]);
  const [selectedMode, setSelectedMode] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<Date>();
  
  const [errorsServices, setErrorsServices] = useState<string>();
  const [errorsMode, setErrorsMode] = useState<string>();
  const [errorsFee, setErrorsFee] = useState<string>();
  const [errorsDate, setErrorsDate] = useState<string>();

  const handleServices = useCallback((option: string) => {
      setSelectedService([option]);
  },[]);

  const handleMode = useCallback((option: string) => {
      setSelectedMode([option]);
  },[]);
  
  const handleDate = useCallback((date: IDate) => {
    setSelectedDate(date.date);
    setSelectedTime(date.time);
  },[]);
  
  const handleModal = () => {
    onOptionModal(false)
  };

  useEffect(()=>{
    dispatch(loading(false))
  },[])

  useEffect(() => {
    if (selectedService) {
      if(selectedService[0]=== 'training'){
        setIsFeeType(true)
        setValue("fee", trainerInfo.fee.trainingFee);
      }else if(selectedService[0]=== 'consulting'){
        setIsFeeType(true)
        setValue("fee", trainerInfo.fee.consultingFee);
      }else{
        setIsFeeType(false)
        setValue("fee", "Please select any services");
      }
    }else{
      setIsFeeType(false)
      setValue("fee", "Please select any services");
    }
  }, [selectedService, setValue, trainerInfo]);

  const feeValue = watch("fee")

  const loadScript = (src: any) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
  }

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);


  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    try{
      e.preventDefault()
      let formData: IBooking = {
        service: [],
        mode: [],
        fee: feeValue,
        date: selectedDate,
        time: selectedTime,
      };
      formData.service = selectedService;
      formData.mode = selectedMode;

      if(selectedService[0] === "" || selectedService.length <= 0){
        return setErrorsServices("Please select any services")
      }else{
        setErrorsServices("")
      }

      if(selectedMode[0] === "" || selectedMode.length <= 0){
        return setErrorsMode("Please select any mode")
      }else{
        setErrorsMode("")
      }

      if (typeof feeValue !== 'number') {
        return setErrorsFee("Please enter a valid fee");
      }else if(feeValue<100){
        return setErrorsFee("Something wrong")
      }else{
        setErrorsFee("");
      }

      if (!selectedDate && !selectedTime) {
        return setErrorsDate("Please select time");
      } else {
        setErrorsDate("");
      }

      const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      if (!res) {
        Swal.fire({
          title: 'Something wrong!',
          text: 'Please check internet connection',
          icon: 'error',
          timer: 1500, 
          timerProgressBar: true,
        });
        return;
      }

      const trainerId = trainerInfo.authId._id
      const {payload} = await dispatch(booking(feeValue))

      const options: any = {
        key: "rzp_test_2z88c1VIfdLPE5",
        currency: "INR",
        amount: payload.amount,
        name: "Waywin",
        description: "Way to success",
        image: redlogo,
        order_id: payload.id,
        handler: async function (response: any) { 
          await dispatch(bookingTrainer({formData,trainerId, bookingId: payload.receipt,orderId: payload.id}))
          navigate('/bookings')
        },
        prefill: {
          name: auth.username,
          email: auth.email,
          contact: auth.phoneNumber,
        },
        theme: { color: "#002D7A" },
      };
      
      const paymentObject: any = new window.Razorpay(options);
      (paymentObject as any).open();

      // navigate('/bookings')
      // toaster.showToast('Bookimg Success', { type: 'success' })
    }catch(error: any){
      toaster.showToast(error.message, { type: 'error' })
    }
  }

  


  return (
    <div className=" flex justify-center w-full">
      <form className="rounded  flex flex-col justify-center w-3/4 md:w-full " onSubmit={handleSubmitForm}>
        <div className="flex items-center justify-center pb-8 text-3xl font-bold">
          Booking
        </div>
        <InputServices onOptionServices={handleServices} error={errorsServices} services={trainerInfo?.profile?.services} />
        <InputMode onOptionMode={handleMode} error={errorsMode} modes={trainerInfo?.profile?.mode} />
        <InputText label="Fee" name="fee" type={isFeeType ? "number" : "text"} register={register} required error={errorsFee} disabled/>
        <InputDate onOptionDate={handleDate} error={errorsDate} availableDates={trainerInfo?.availableDates} />
          <div className="flex justify-center items-center gap-6 mt-8 ">
            <button className="text-2xl" onClick={handleModal}>Close</button>
            <button type={!isLoading ? "submit" : "button"}
              className="bg-red-600 text-white dark:bg-blue-800 w-3/12 p-3 rounded-xl text-2xl flex items-center justify-center"
            >
              {isLoading && <Puff height="25" width="25" className="me-3" />}
              Submit
            </button>
          </div>
      </form>
    </div>
  );
};

export default FormBooking;
