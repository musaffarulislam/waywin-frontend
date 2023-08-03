import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../app/slices/themeSlice"; 
import { RiDashboardFill } from 'react-icons/ri';
import { HiChatAlt, HiOutlineMenuAlt2, HiCollection } from 'react-icons/hi';
import { BsCalendar3 } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { getAuthInfo, logout } from "../../app/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { InputDropdown } from "../Inputs/InputDropdown";
import { IAuth } from "../../utils/entity/AdminEntity";
import { ThunkDispatch } from "@reduxjs/toolkit";

import whitelight from "../../assets/whitelogo.png";
import bluelight from "../../assets/bluelogo.png";

export const NavbarTrainer = () => {

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const [isOpen, setIsOpen] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);
  const theme: string = useSelector((state: any) => state.theme.theme);
  const auth: IAuth = useSelector((state: any)=> state.auth.auth)

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(getAuthInfo())
  },[dispatch])
 
  const toggleSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <>
      <nav className="fixed p-3 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-2xl text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Open sidebar</span>
                < HiOutlineMenuAlt2 className="w-6 h-6" />
              </button>
              <div className="ms-6">
                <Link to="/">
                  <img
                    src={theme === "dark" ? whitelight : bluelight}
                    alt="logo"
                    className="w-32 md:w-40"
                  />
                </Link>
              </div>
            </div>
            <div className="relative">
              <button
                type="button"
                className="flex text-2xl bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                aria-expanded={isOpen}
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user dropdown" />
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 text-base bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                  <div className="px-4 py-3">
                    <p className="text-2xl text-gray-900 dark:text-white">
                    {auth.username}
                    </p>
                    <p className="text-xl font-medium text-gray-900 truncate dark:text-gray-300">
                      {auth.email}
                    </p>
                  </div>
                  <ul className="py-1">
                    <li> <InputDropdown>Dashboard</InputDropdown> </li>
                    <li> <InputDropdown>Earnings</InputDropdown> </li>
                    <li>
                      <div className="block px-4 py-2 text-2xl text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" >
                        <label className="relative inline-flex items-center mr-5 cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" checked={theme === "dark"} onChange={handleThemeToggle} />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ml-3 text-2xl font-medium text-gray-900 dark:text-gray-300">Theme</span>
                        </label>
                      </div>  
                    </li>
                    <li onClick={handleLogout}> <InputDropdown>Signout</InputDropdown> </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-96 h-screen pt-28 transition-transform  ${isSidebar ? "translate-x-0" : "-translate-x-full" } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-8 pb-4 text-2xl overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link to="/trainer">
                <div className="flex items-center p-2 my-6 text-gray-900 rounded-lg dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-700" >
                  <RiDashboardFill className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                  <span className="ml-3">Dashboard</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/trainer/profile">
                <div className="flex items-center p-2 my-6 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" >
                  < CgProfile className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
                  <span className="inline-flex items-center justify-center px-2 ml-3 text-2xl font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                    New
                  </span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/trainer/dates">
                <div className="flex items-center p-2 my-6 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" >
                  <BsCalendar3 className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                  <span className="flex-1 ml-3 whitespace-nowrap">Dates</span>           
                </div>
              </Link>
            </li> 
            <li>
              <Link to="/trainer/chats">
                <div className="flex items-center p-2 my-6 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" >
                  <HiChatAlt className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                  <span className="flex-1 ml-3 whitespace-nowrap">Chat</span>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/trainer/programs">
                <div className="flex items-center p-2 my-6 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" >
                  <HiCollection className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                  <span className="flex-1 ml-3 whitespace-nowrap">Programs</span>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};
