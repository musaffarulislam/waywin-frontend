import React from 'react';
import {ImageUploader} from './ImageUploader';
import FormTrainerDetails from '../../Forms/FormTrainerDetails'; 
import FormTrainerProfile from '../../Forms/FormTrainerProfile';
import { BannerUploader } from './BannerUploader';
import FormTrainerFee from '../../Forms/FormTrainerFee';

export const MainContent = () => {
  return (
    <div className="p-4 sm:ml-96 pt-16">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="flex items-center relative justify-center h-40 sm:h-48 md:h-56 lg:h-72 mb-4 rounded bg-slate-500 dark:bg-gray-500">
            <BannerUploader />
            <ImageUploader />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-20 md:mt-28 lg:mt-36 mb-4">
          <div>
            <div className="h-fit flex items-center justify-center rounded bg-slate-500 dark:bg-gray-800 py-20">
              <FormTrainerDetails />
            </div>
            <div className="h-fit flex items-center justify-center rounded bg-slate-500 dark:bg-gray-800 py-20 mt-6">
              <FormTrainerFee />
            </div>
          </div>
          <div className="flex items-center justify-center rounded bg-slate-500 dark:bg-gray-800 py-12">
            <FormTrainerProfile />
          </div>
        </div>
      </div>
    </div>
  )
}
