import React, { useEffect } from 'react'
import { ChartMode } from './ChartMode'
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { getChartMode, getChartService } from '../../../app/slices/trainerSlice';
import { ChartService } from './ChartService';

export const MainContent = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(getChartMode())
    dispatch(getChartService())
  }, [dispatch]);

  return (
    <div className="p-4 sm:ml-96 pt-16">
    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center justify-center rounded">
          <ChartMode />
        </div>
        <div className="flex items-center justify-center rounded">
          <ChartService />
        </div> 
      </div>
    </div>
  </div>
  )
}
