import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {changeAuthStatus, getActiveTrainersInfo, getAllTrainersInfo, getInactiveTrainersInfo } from "../../../app/slices/adminSlice";
import useToaster from "../../../hooks/useToast";

export const TrainerManagmentTable = () => {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const toaster = useToaster();

    const trainers : string[] | null = useSelector((state:any) => state.admin.trainers);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isFilter, setIsFilter] = useState<string>("All");

    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };

    const handleFilter = (event: any) =>{
      setIsFilter(event.target.value)
    }

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    useEffect(()=>{
      if(isFilter === "Inactive"){
        dispatch(getInactiveTrainersInfo());
      }else if(isFilter === "Active"){
        dispatch(getActiveTrainersInfo());
      }else{
        dispatch(getAllTrainersInfo());
      }
    },[dispatch, isFilter])

    const handleStatus = async (authId: string) => {
      await dispatch(changeAuthStatus(authId));
      if(isFilter === "Inactive"){
        dispatch(getInactiveTrainersInfo());
      }else if(isFilter === "Active"){
        dispatch(getActiveTrainersInfo());
      }else{
        dispatch(getAllTrainersInfo());
      }
      toaster.showToast("Trainer status change successful", { type: 'success' });
    };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex items-center justify-between pb-4">
        <div className="relative">
          <button
            id="dropdownRadioButton"
            className="inline-flex justify-between items-center w-48 text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xl px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
            onClick={toggleDropdown}
          >
            <svg
              className="w-4 h-4 mr-2 text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              ></path>
            </svg>
              {isFilter}
            <svg
              className="w-3 h-3 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {isOpen && (
            <div
              id="dropdownRadio"
              className="z-10 absolute right-0 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            >
              <ul
                className="p-3 space-y-1 text-xl text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownRadioButton"
              >
                <li>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="filter-radio-example-1"
                      type="radio"
                      value="All"
                      name="filter-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={isFilter === "All"}
                      onChange={handleFilter}
                    />
                    <label
                      htmlFor="filter-radio-example-1"
                      className="w-full ml-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      All
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="filter-radio-example-2"
                      type="radio"
                      value="Active"
                      name="filter-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={isFilter === "Active"}
                      onChange={handleFilter}
                    />
                    <label
                      htmlFor="filter-radio-example-2"
                      className="w-full ml-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      Active
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="filter-radio-example-3"
                      type="radio"
                      value="Inactive"
                      name="filter-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={isFilter === "Inactive"}
                      onChange={handleFilter}
                    />
                    <label
                      htmlFor="filter-radio-example-3"
                      className="w-full ml-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      Inactive
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="filter-radio-example-3"
                      type="radio"
                      value="Verified"
                      name="filter-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={isFilter === "Verified"}
                      onChange={handleFilter}
                    />
                    <label
                      htmlFor="filter-radio-example-3"
                      className="w-full ml-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      Verified
                    </label>
                  </div>
                </li>
                <li>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="filter-radio-example-3"
                      type="radio"
                      value="Unverified"
                      name="filter-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={isFilter === "Unverified"}
                      onChange={handleFilter}
                    />
                    <label
                      htmlFor="filter-radio-example-3"
                      className="w-full ml-2 text-xl font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      Unverified
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block p-2 pl-10 text-xl text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
      </div>
      <table className="w-full text-xl text-left text-gray-500 dark:text-gray-400">
        <thead className="text-2xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              phone number
            </th>
            <th scope="col" className="px-6 py-3">
              Profile Image
            </th>
            <th scope="col" className="px-6 py-3">
              Profile Info
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
              {trainers && trainers.length > 0 ? (
                trainers
                .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
                .map((trainer, index)=>{
                    const trainerObject = typeof trainer === 'string' ? JSON.parse(trainer) : trainer;
                    const isStatusActive = Boolean(trainerObject?.authId?.isActive);
                    const isProfile = Boolean(trainerObject?.isProfile);
                    return(
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="px-6 py-6 w-1/6 font-medium text-gray-900 whitespace-nowrap dark:text-white" >
                          {trainerObject?.authId?.email}
                        </th>
                        <td className="px-6 py-6 w-1/6">{trainerObject?.authId?.username}</td>
                        <td className="px-6 py-6 w-1/6">{trainerObject?.authId?.phoneNumber}</td>
                        <td className="px-6 py-6 w-1/6">
                          {isProfile ? 
                            (
                              <div className="w-full">
                                <div className="w-20 h-20 flex items-center justify-center">
                                  <img src={trainerObject?.profileImage?.url} alt="Profile Image" className="w-full h-full object-cover rounded-full opacity-100 hover:opacity-50 transition-opacity duration-300" />
                                </div>
                              </div>
                            ):(
                              <div>No Image</div>
                            )
                          }
                        </td>
                        <td className="px-6 py-6 w-1/6">
                        <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                          Click Here  
                        </button>  
                        </td>
                        <td className="px-6 py-6 w-1/6">
                          <div className="w-1/5 font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                          onClick={()=>handleStatus(trainerObject?.authId?._id)}>
                              {isStatusActive ? 
                                  ( <div> Active </div> ) : (<div> Unactive </div>)
                              }
                          </div>
                        </td>
                    </tr>
                    )
                })
              ) : (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td colSpan={4}>No User Available</td>
                </tr>
              )}
        </tbody>
      </table>
      <div className="flex justify-center py-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 text-xl font-medium text-gray-900 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
        >
          Previous
        </button>
        <div className="mx-5 text-2xl flex items-center">
          {currentPage}
        </div>
        <button
          disabled={!trainers || trainers.length === 0 || trainers.length <= currentPage * rowsPerPage}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className=" px-3 py-1 text-xl font-medium text-gray-900 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
        >
          Next
        </button>
      </div>
      {/* <div id="editUserModal" tabIndex={-1} aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-2xl max-h-full">
            <form action="#" className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit user
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                            <input type="text" name="first-name" id="first-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie"/>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                            <input type="text" name="last-name" id="last-name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Green" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" name="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@company.com" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="phone-number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                            <input type="number" name="phone-number" id="phone-number" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. +(12)3456 789" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                            <input type="text" name="department" id="department" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Development" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                            <input type="number" name="company" id="company" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123456" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="current-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
                            <input type="password" name="current-password" id="current-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                            <input type="password" name="new-password" id="new-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save all</button>
                </div>
            </form>
        </div>
      </div> */}
    </div>
  );
};
