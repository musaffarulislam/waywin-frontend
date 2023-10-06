import React from 'react';
import { useSelector } from 'react-redux';

export const BannerImage = () => {

  const trainerInfo = useSelector((state: any) => state.user.trainerInfo)

  return (
    <div className="flex items-center justify-center w-full absolute  rounded-2xl">
      <label htmlFor="dropzone-file" className="relative w-full h-40 sm:h-48 md:h-56 lg:h-72  rounded-2xl">
        <div className="absolute inset-0 flex flex-col items-center justify-start w-full h-full  rounded-2xl bg-gray-50 dark:hover:bg-bray-800 dark:bg-slate-800 hover:bg-gray-100  dark:hover:bg-gray-600">
          { trainerInfo && trainerInfo?.bannerImage ?
              <>
                <img src={trainerInfo?.bannerImage?.url} alt="Preview" className="w-full h-full object-cover  rounded-2xl" />      
              </>
            :
                <div className="w-32 sm:w-40 md:w-48 lg:w-56 object-cover">
                    <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 32 32" id="no-image"><path fill="#56aaff" d="M24,4H4A3,3,0,0,0,1,7V21a2.87,2.87,0,0,0,.28,1.25,1,1,0,0,0,.76.56h.14a1,1,0,0,0,.75-.34l7-7.93,3.87,4.83a1,1,0,0,0,1.43.13L19,16.32l3.34,2.86a1,1,0,0,0,1.05.16,3.94,3.94,0,0,1,2.4-.26,1,1,0,0,0,1.2-1V7A3,3,0,0,0,24,4Z"></path><path fill="#0478ed" d="M23.64,17.66l-4-3.42a1,1,0,0,0-1.3,0l-3.61,3.09-4-5A1,1,0,0,0,10,12a1,1,0,0,0-.77.34L1.43,21.16a1,1,0,0,0-.16,1.07A3,3,0,0,0,4,24H20a1,1,0,0,0,1-1,4,4,0,0,1,1.17-2.83,3.89,3.89,0,0,1,1.22-.83,1,1,0,0,0,.26-1.68Z"></path><path fill="#fff" d="M28.54,26.54a5,5,0,0,1-7.08-7.08,4.89,4.89,0,0,1,1.53-1,5,5,0,0,1,5.55,1A5,5,0,0,1,28.54,26.54Z"></path><path fill="#56aaff" d="M25,29a6,6,0,0,1-4.25-10.24,6,6,0,0,1,8.49,0,6,6,0,0,1,0,8.49h0A6,6,0,0,1,25,29Zm0-10a4,4,0,0,0-2.82,1.17,4,4,0,0,0,0,5.67,4,4,0,1,0,5.66-5.67,3.9,3.9,0,0,0-2-1.08A4,4,0,0,0,25,19Zm3.55,7.54h0Z"></path><path fill="#56aaff" d="M21.46,27.54a1,1,0,0,1-.71-1.71l7.07-7.07a1,1,0,0,1,1.41,1.41l-7.07,7.07A1,1,0,0,1,21.46,27.54Z"></path><circle cx="16" cy="10" r="2" fill="#fff"></circle></svg>
                </div>

          }
        </div>

      </label>
    </div>
  );
}
