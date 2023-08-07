import React, { Suspense, useEffect, useState } from "react";
import { getBookingInfo } from "../../../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import Puff from "react-loading-icons/dist/esm/components/puff";
import Pagination from "./Pagination"; 
const BookingCard = React.lazy(() => import('./BookingCard').then(module => ({ default: module.BookingCard })));

const ITEMS_PER_PAGE = 8; 

const Hero = () => {

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const bookings = useSelector((state: any) => state.user.bookings)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getBookingInfo())
  }, [dispatch])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);  
  };
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const filteredBookings = bookings?.filter((booking: any) => {
    return booking?.trainerId?.authId?.username.toLowerCase().includes(searchTerm.toLowerCase());
  }) ?? [];
  
  const paginatedTrainers = filteredBookings.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className='px-6 pt-20 m-16 sm:px-14 md:px-40 mb-60 mx-auto max-w-screen-xl'>
      <div>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search trainers..."
            className="w-full sm:w-3/4 md:w-2/4 lg:w-1/4 px-4 py-2 border border-blue-900 dark:border-white rounded-full focus:outline-none focus:ring-2 bg-transparent focus:ring-blue-500"
          />
        </div>
        <Suspense fallback={
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Puff />
        </div>
      } >
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-14 justify-center mt-16'>
            {paginatedTrainers.map((booking: any, index: number) => (
                <BookingCard key={index} booking={booking} />
              ))}
        </div>
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={filteredBookings.length}
            onPageChange={handlePageChange}
          />
        </div>
        {filteredBookings.length === 0 && ( 
          <div className="text-center mt-4">No bookings available.</div>
        )}
      </Suspense></div>
    </div>
  )
}

export default Hero