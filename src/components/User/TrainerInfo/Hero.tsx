import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BannerImage } from "./BannerImage";
import { ProfileImage } from "./ProfileImage";
import FormUserTrainerInfo from "../../Forms/FormUserTrainerInfo";
import FormBooking from "../../Forms/FormBooking";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const Hero = () => {

  const trainerInfo = useSelector((state: any)=> state.user.trainerInfo)
  const accessToken = window.localStorage.getItem("accessToken");
  const navigate = useNavigate()

  const [isModal, setIsModal] = useState<boolean>(false);

  const handleModal = () =>{
    if(accessToken){
      setIsModal(!isModal)  
    }else{
      Swal.fire({
        title: 'Please Login!',
        text: "You want to login!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Login!'
      }).then((result: any) => {
        if (result.isConfirmed) {
          navigate('/login')
        }
      })
    }
  }

  return (
    <div className='px-6 pt-8 md:pt-16 sm:px-14 md:px-40 m-16 mb-60 mx-auto max-w-screen-xl'>
      <div className="flex items-center relative justify-center h-40 sm:h-48 md:h-56 lg:h-72 mb-4 bg-slate-500 dark:bg-gray-500 rounded-2xl">
        <BannerImage />
        <ProfileImage />
      </div>
      <div className="mt-24 md:mt-32 lg:mt-40">
        <div className="flex items-center justify-center rounded-2xl text-4xl md:text-7xl">
          {trainerInfo?.authId?.username}
        </div>
        <div className="flex items-center justify-center rounded-2xl text-xl md:text-2xl mt-3 text-opacity-60">
          {trainerInfo?.authId?.email}
        </div>
        <div className="flex items-center justify-center rounded-2xl text-lg md:text-2xl text-center mt-8">
          {trainerInfo?.profile?.experience > 0 ?(
            <div className="border p-3 px-6 rounded-2xl">
            {trainerInfo?.profile?.experience} Year Experience
            </div>
          )
          : <div>New</div>
          }
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-6 md:mt-12 lg:mt-16 mb-4">
          <div className="flex items-center justify-center rounded">
            <FormUserTrainerInfo />
          </div>
      </div>
      <div className="flex justify-center gap-4">
        <button className="bg-violet-800 text-white dark:bg-green-800  p-3 px-12 mb-8 rounded-xl text-2xl flex items-center justify-center" >Message</button>
        <button className="bg-red-600 text-white dark:bg-blue-700  p-3 px-12 mb-8 rounded-xl text-2xl flex items-center justify-center" onClick={handleModal}>Booking</button>
      </div>
      {isModal && (
  <div
    id="BookingModal"
    tabIndex={-1}
    className="flex overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center w-full inset-0 h-screen bg-black bg-opacity-50"
  >
    <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
      <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Trainer Booking
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-xl p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="updateProductModal"
            onClick={() => handleModal()}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <FormBooking trainerInfo={trainerInfo} />
        {/* <InputText label="Tag" name="tag" type="text" register={register} required error={errors.tag?.message} /> */}
      </div>
    </div>
  </div>
)}

    </div>
  )
}

export default Hero