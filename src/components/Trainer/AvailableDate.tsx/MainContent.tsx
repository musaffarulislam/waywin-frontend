import React from 'react';
import FormTrainerDetails from '../../Forms/FormTrainerDetails'; 
import FormTrainerProfile from '../../Forms/FormTrainerProfile';
import Calander from './Calender';

export const MainContent = () => {
  return (
    <div className="p-4 sm:ml-96 pt-16">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="h-fit flex items-center justify-center rounded bg-slate-500 dark:bg-gray-800 py-20">
            <Calander />
          </div>
      </div>
    </div>
  )
}
