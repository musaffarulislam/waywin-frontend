import React, { Suspense, useEffect, useState } from "react";
import { getAllTrainersInfo } from "../../../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Pagination from "./Pagination";
import Puff from "react-loading-icons/dist/esm/components/puff"; 
const TrainerCard = React.lazy(() => import('./TrainerCard').then(module => ({ default: module.TrainerCard })));

const ITEMS_PER_PAGE = 8; 

const Hero = () => {

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const trainers: any= useSelector((state: any) => state.user.trainers);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(()=>{
    dispatch(getAllTrainersInfo())
  },[dispatch])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const filteredTrainers = trainers?.filter((trainer: any) => {
    return trainer?.authId?.username.toLowerCase().includes(searchTerm.toLowerCase());
  }) ?? [];  
  
  const paginatedTrainers = filteredTrainers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="px-6 pt-20 m-16 sm:px-14 md:px-40 mb-60 mx-auto max-w-screen-xl">
      <div>
        <div className="flex justify-center mb-10">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search trainers..."
            className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 px-4 py-2 text-xl border border-blue-900 dark:border-white rounded-3xl focus:outline-none focus:ring-2 bg-transparent focus:ring-blue-500"
          />
        </div>
        <div>
          <Suspense fallback={
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <Puff />
            </div>
          }>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-14 justify-center mt-20">
              {paginatedTrainers.map((trainer: any, index: number) => (
                <TrainerCard key={index} trainer={trainer} />
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Pagination
                currentPage={currentPage}
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={filteredTrainers.length}
                onPageChange={handlePageChange}
              />
            </div>
            {filteredTrainers.length === 0 && ( 
              <div className="text-center mt-4">No trainers available.</div>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default Hero