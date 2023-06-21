import React from "react";
import { MdDarkMode, MdSunny } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../app/slices/themeSlice";

const NavbarTheme = () => {
  const dispatch = useDispatch();
  const theme: string = useSelector((state: any) => state.theme.theme);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <nav
      className={`w-full absolute h-5 flex justify-between items-center mt-5 p-4`}
    >
      <div className="text-2xl font-bold"></div>
      <div>
        <button
          className={`px-3 py-1 rounded ${
            theme === "dark" ? "text-white text-2xl" : "text-gray-800 text-2xl"
          }`}
          onClick={handleThemeToggle}
        >
          {theme === "dark" ? <MdSunny /> : <MdDarkMode />}
        </button>
      </div>
    </nav>
  );
};

export default NavbarTheme;
