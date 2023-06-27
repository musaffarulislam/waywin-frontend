import React, { useState } from "react";
import { TbBellRingingFilled } from "react-icons/tb";
import { FiLogIn } from "react-icons/fi";
import { MdDarkMode, MdSunny } from "react-icons/md";
import redlight from "../../assets/redlogo.png";
import whitelight from "../../assets/whitelogo.png";
import bluelight from "../../assets/bluelogo.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../app/slices/themeSlice";
import { Link } from "react-router-dom";
import { addAuth, logout } from "../../app/slices/authSlice";

const NavbarUser = () => {
  const dispatch = useDispatch();

  const theme: string = useSelector((state: any) => state.theme.theme);
  const accessToken: string | null = window.localStorage.getItem("accessToken");

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };


  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="fixed z-10 w-full ">
      <div className="p-3 top-0">
        <div className="w-full h-[2.5 rem] bg-slate-400 bg-opacity-40 dark:bg-slate-800  dark:bg-opacity-40  px-6 sm:px-14 md:px-32 p-4 flex items-center justify-between rounded-2xl text-2xl font-medium">
          <div>
            <Link to="/">
              <img
                src={theme === "dark" ? whitelight : bluelight}
                alt="logo"
                className="w-32 md:w-40"
              />
            </Link>
          </div>
          <div className="hidden md:flex gap-10 items-center">
            <div>Home</div>
            <div>Trainers</div>
            <div>About Us</div>
            {accessToken && <TbBellRingingFilled />}
            <button className="px-3 py-1 rounded text-gray-800 dark:text-white"
              onClick={handleThemeToggle}
            >
              {theme === "dark" ? <MdSunny /> : <MdDarkMode />}
            </button>
            {accessToken ? 
              <div className="flex items-center cursor-pointer" onClick={handleLogout}>Logout <FiLogIn className="ms-1"/></div>
              : <Link to="/login">
                  <div className="flex items-center">Login <FiLogIn className="ms-1"/></div>
                </Link>
            }

          </div>
            <div className="block md:hidden relative" data-te-dropdown-ref>
              <button
                className="flex items-center whitespace-nowrap rounded bg-primary px-6 pb-2 pt-2.5 font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-primary-600 "
                type="button"
                id="dropdownMenuButton2"
                data-te-dropdown-toggle-ref
                aria-expanded={isOpen ? "true" : "false"}
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={toggleDropdown}
              >
                Dropdown link
              </button>
              {isOpen && (
                <ul
                  className="absolute z-[1000] float-left m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                  aria-labelledby="dropdownMenuButton2"
                  data-te-dropdown-menu-ref
                >
                  <li>
                    <button
                      className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-xl font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                      onClick={() => console.log("Action clicked")}
                    >
                      Action
                    </button>
                  </li>
                  <li>
                    <button
                      className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-xl font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                      onClick={() => console.log("Another action clicked")}
                    >
                      Another action
                    </button>
                  </li>
                  <li>
                    <button
                      className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-xl font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                      onClick={() => console.log("Something else clicked")}
                    >
                      Something else here
                    </button>
                  </li>
                </ul>
              )}
            </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarUser;
