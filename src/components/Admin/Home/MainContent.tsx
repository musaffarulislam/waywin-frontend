import React, { useEffect } from 'react'
import {Chart} from './Chart'
import { useDispatch } from 'react-redux';
import {   getChartData } from '../../../app/slices/adminSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';

export const MainContent = () => {

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(getChartData())
  }, [dispatch]);

  return (
    <div className="p-4 sm:ml-96 pt-16">
      <div className="border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14 p-16">
        <Chart />
      </div>
    </div>
  )
}
