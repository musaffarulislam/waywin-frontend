import React, { useEffect, useState } from "react";
import { TbBellRingingFilled } from "react-icons/tb";
import { FiLogIn } from "react-icons/fi";
import redlight from "../../assets/redlogo.png";
import whitelight from "../../assets/whitelogo.png";
import bluelight from "../../assets/bluelogo.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../app/slices/themeSlice";
import { Link } from "react-router-dom";
import { getAuthInfo, logout } from "../../app/slices/authSlice";
import { RiDashboardFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { BsCalendar3 } from "react-icons/bs";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { InputDropdown } from "../Inputs/InputDropdown";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { IAuth } from "../../utils/entity/AuthEntity copy";
import { MdDarkMode, MdSunny } from "react-icons/md";

const NavbarUser = () => {

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const theme: string = useSelector((state: any) => state.theme.theme);
  const auth: IAuth = useSelector((state: any)=> state.auth.auth)

  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");
    setAccessToken(token);
  }, []);

  useEffect(() => {
    if(accessToken){
      dispatch(getAuthInfo())
    }
  },[accessToken, dispatch])

  const [isSidebar, setIsSidebar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };


  const handleSignout = () => {
    dispatch(logout())
    setAccessToken(null);
  }

  return (
    <>
      <nav className="fixed z-20 w-full ">
        <div className="p-3 top-0">
          <div className="w-full h-[2.5 rem] bg-white bg-opacity-80 shadow-xl dark:bg-slate-500  dark:bg-opacity-40  px-6 sm:px-14 md:px-32 p-4 flex items-center justify-between rounded-2xl text-2xl font-medium">
            <div>
              <Link to="/">
                <img src={theme === "dark" ? whitelight : bluelight} alt="logo" className="w-32 md:w-40" />
              </Link>
            </div>
            <div className="hidden md:flex gap-10 items-center">
              <div>
                <Link to="/">
                  <div className="flex items-center">Home </div>
                </Link>
              </div>
              <div>
                <Link to="/trainers">
                  <div className="flex items-center">Trainers </div>
                </Link>
              </div>
              <div>
                <Link to="/trainers">
                  <div className="flex items-center">Bookings </div>
                </Link>
              </div>
              <div>About Us</div>
              {accessToken ? <TbBellRingingFilled /> :
                <button className="px-3 py-1 rounded text-gray-800 dark:text-white"
                  onClick={handleThemeToggle}
                >
                {theme === "dark" ? <MdSunny /> : <MdDarkMode />
               }
             </button>}
              
              {accessToken ? 
                // <div className="flex items-center cursor-pointer" onClick={handleSignout}>Signout <FiLogIn className="ms-1"/></div>

                <div className="relative">
                  <button
                    type="button"
                    className="flex text-2xl bg-slate-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded={isOpen}
                    onClick={toggleDropdown}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="admin toggle" />
                  </button>
                  {isOpen && (
                    <div className="absolute right-0 mt-2 text-base bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                      <div className="px-4 py-3">
                        <p className="text-2xl text-gray-900 dark:text-white">
                          {auth.username}
                        </p>
                        <p className="text-xl font-normal text-gray-900 truncate dark:text-gray-300">
                          {auth.email}
                        </p>
                      </div>
                      <ul className="py-1">
                        <li> <InputDropdown>Profile</InputDropdown> </li>
                        <li>
                          <div className="block px-4 py-2 text-2xl text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" >
                            <label className="relative inline-flex items-center mr-5 cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" checked={theme === "dark"} onChange={handleThemeToggle} />
                                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ml-3 text-2xl font-medium text-gray-900 dark:text-gray-300">Theme</span>
                            </label>
                          </div>  
                        </li>
                        <li onClick={handleSignout}> <InputDropdown>Signout</InputDropdown> </li>
                      </ul>
                    </div>
                  )}
                </div>

                : <Link to="/login">
                    <div className="flex items-center">Login <FiLogIn className="ms-1"/></div>
                  </Link>
              }

            </div>
              <div className="block md:hidden relative" data-te-dropdown-ref>
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
                
              </div>
          </div>
        </div>
      </nav>

      <aside
      id="logo-sidebar"
      className={`fixed top-24 right-0 z-40 w-96 h-screen md:hidden transition-transform  ${isSidebar ? "translate-x-0" : "translate-x-full" } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 bg-opacity-60 dark:bg-opacity-40`}
      aria-label="Sidebar"
      >
      <div className="h-full px-8 pb-4 text-2xl overflow-y-auto bg-white dark:bg-gray-800 bg-opacity-60 dark:bg-opacity-40">
        <ul className="space-y-2 font-medium">
          <li>
            <Link to="/">
              <div className="flex items-center p-2 my-6 text-gray-900 rounded-lg dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-700" >
                <RiDashboardFill className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                <span className="ml-3">Home</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/trainers">
              <div className="flex items-center p-2 my-6 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" >
                < CgProfile className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">Trainers</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/bookings">
              <div className="flex items-center p-2 my-6 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" >
                < CgProfile className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">Bookings</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <div className="flex items-center p-2 my-6 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" >
                < CgProfile className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/aboutus">
              <div className="flex items-center p-2 my-6 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" >
                <BsCalendar3 className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                <span className="flex-1 ml-3 whitespace-nowrap">Abouts</span>           
              </div>
            </Link>
          </li>
          <li>
            <div className="block p-2 my-6 text-2xl text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem" >
              <label className="relative inline-flex items-center mr-5 cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked={theme === "dark"} onChange={handleThemeToggle} />
                <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-2xl font-medium text-gray-900 dark:text-gray-300">Theme</span>
              </label>
            </div>  
          </li>
          <li>
            {!accessToken ? 
            <Link to="/login">
              <div className="flex items-center p-2 my-6 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" >
                <FiLogIn className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                <span className="flex-1 ml-3 whitespace-nowrap">Login</span>
              </div>
            </Link>
            : (
              <div className="flex items-center p-2 my-6 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700" onClick={handleSignout}>
                <FiLogIn className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"/>
                <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
              </div>
            )}
          </li>
        </ul>
      </div>
      </aside>
    </>
  );
};

export default NavbarUser;
