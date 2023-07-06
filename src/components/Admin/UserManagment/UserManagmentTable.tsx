import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAuthStatus, getActiveUsersInfo, getAllUsersInfo, getInactiveUsersInfo } from "../../../app/slices/adminSlice";
import useToaster from "../../../hooks/useToast";

export const UserManagmentTable = () => {

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const toaster = useToaster();

  const users: string[] | null = useSelector((state: any) => state.admin.users);

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
      dispatch(getInactiveUsersInfo());
    }else if(isFilter === "Active"){
      dispatch(getActiveUsersInfo())
    }else{
      dispatch(getAllUsersInfo());
    }
  },[dispatch, isFilter])

  const handleStatus = async (authId: string) => {
    try{
      await dispatch(changeAuthStatus(authId));
      if(isFilter === "Inactive"){
        await dispatch(getInactiveUsersInfo());
      }else if(isFilter === "Active"){
        await dispatch(getActiveUsersInfo())
      }else{
        await dispatch(getAllUsersInfo());
      }
      toaster.showToast("User status change successful", { type: 'success' });
    }catch(error: unknown){
      const errorMessage = (error as Error).message || "An error occurred";
      toaster.showToast(errorMessage, { type: 'error' });
    }
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
              Phone number
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users
              .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
              .map((user, index) => {
                const userObject = typeof user === "string" ? JSON.parse(user) : user;
                const isStatusActive = Boolean(userObject?.authId?.isActive);
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-6">{userObject?.authId?.email}</td>
                    <td className="px-6 py-6">{userObject?.authId?.username}</td>
                    <td className="px-6 py-6">{userObject?.authId?.phoneNumber}</td>
                    <td className="px-6 py-6">
                      <div
                        className="w-1/5 font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                        onClick={() => handleStatus(userObject?.authId?._id)}
                      >
                        {isStatusActive ? "Active" : "Inactive"}
                      </div>
                    </td>
                  </tr>
                );
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
          disabled={!users || users.length === 0 || users.length <= currentPage * rowsPerPage}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className=" px-3 py-1 text-xl font-medium text-gray-900 rounded bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};
