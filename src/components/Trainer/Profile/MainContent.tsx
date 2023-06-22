import React from 'react'
import {ImageUploader} from './ImageUploader'
import FormTrainerDetails from '../../Forms/FormTrainerDetails'

export const MainContent = () => {
  return (
    <div className="p-4 sm:ml-96 pt-16">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="flex items-center relative justify-center h-64 mb-4 rounded bg-slate-300 dark:bg-gray-800">
          <ImageUploader />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-36 mb-4">
          <div className="flex items-center justify-center rounded bg-slate-300 dark:bg-gray-800 py-12">
            <FormTrainerDetails />
          </div>
          <div className="flex items-center justify-center rounded bg-slate-300 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-48 mb-4 rounded bg-slate-300 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-center rounded bg-slate-300 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-slate-300 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-slate-300 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="flex items-center justify-center rounded bg-slate-300 h-28 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
        </div>
      </div>
    </div>
  )
}
