import React from "react";
import { useSelector } from "react-redux";
import { BannerImage } from "./BannerImage";
import { ProfileImage } from "./ProfileImage";
import FormUserTrainerInfo from "../../Forms/FormUserTrainerInfo";


const Hero = () => {

  const trainerInfo = useSelector((state: any)=> state.user.trainerInfo)

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

    </div>
  )
}

export default Hero