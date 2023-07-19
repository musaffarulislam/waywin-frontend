import { ThunkDispatch } from '@reduxjs/toolkit';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loading, uploadProfileImage } from '../../../app/slices/trainerSlice';
import { Puff } from "react-loading-icons";


export const ImageUploader = () => {
  const [image, setImage] = useState<string | null>(null);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const profileImage: string | null = useSelector((state: any)=> state.trainer.profileImage)
  const isLoadingImage: boolean = useSelector((state: any)=> state.trainer.isLoadingImage)

  const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => { 
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const image = reader.result as string
        await setImage(image)
        uploadFile(image);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadFile = (image: string | null) =>{ 
    dispatch(uploadProfileImage(image))
  }

  useEffect(()=>{
    dispatch(loading(false));
  }, [dispatch])

  return (
    <div className="flex items-center justify-center w-full absolute -bottom-16 sm:-bottom-20 md:-bottom-24 lg:-bottom-28 z-10">
      <label htmlFor="dropzone-file-profile" className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
        <div className="absolute inset-0 flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-slate-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          { isLoadingImage ? <Puff height="25" width="25" /> :
           profileImage ? 
              <>
                <img src={profileImage} alt="Preview" className="w-full h-full object-cover rounded-full opacity-100 hover:opacity-0 transition-opacity duration-300" />
                <div className='absolute flex flex-col items-center justify-center w-full h-full opacity-0 hover:opacity-100 transition-opacity hover:bg-slate-500 hover:bg-opacity-70 rounded-full'>
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-100 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                </div>       
              </>
            : image ? (
              <>
                <img src={image} alt="Preview" className="w-full h-full object-cover rounded-full opacity-100 hover:opacity-0 transition-opacity duration-300" />
                <div className='absolute flex flex-col items-center justify-center w-full h-full opacity-0 hover:opacity-100 transition-opacity hover:bg-slate-500 hover:bg-opacity-70 rounded-full'>
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-100 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                </div>            
              </>
            ) : (
              <>
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </>
            )
          }
        </div>
        <input
          id="dropzone-file-profile"
          type="file"
          className="hidden"
          onChange={handleProfileImageChange} // Assign the correct event handler
          accept="image/svg+xml,image/png,image/jpeg,image/gif"
        />
      </label>
    </div>
  );
}
