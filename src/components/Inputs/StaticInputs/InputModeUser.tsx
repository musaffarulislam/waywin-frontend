import React, { useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";

type optionProps = {
  mode: string[];
};

const InputModeUser = ({ mode }: optionProps) => {

  const [isContent, setIsContent] = useState(false);

  const handleContent = () => { 
    setIsContent(!isContent);
  };
 
  // const handleMode = () => {};

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full md:w-10/12 lg:w-8/12 text-2xl flex flex-row sm:flex-col md:flex-row items-center justify-center "
          x-data="app"
        >
          {mode && mode.includes("online") && (
          <div className="rounded-xl p-2 px-4 bg-slate-200 dark:bg-red-600 mb-0 sm:mb-6 md:mb-0">
            <div className="flex items-center ">
              {/* <input
                id="service-checkbox-1"
                type="checkbox"
                value="online"
                name="bordered-checkbox"
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={mode.includes("online")}
                onChange={handleMode}
              /> */}
              <label
                htmlFor="bordered-checkbox-1"
                className="w-full ml-2 font-medium text-gray-900 dark:text-gray-300"
                >
                Online
              </label>
            </div>
          </div>
          )}
          <div className="flex ms-6 sm:ms-0 md:ms-6">
            {mode && mode.includes("offline") && (
            <div className="rounded-xl p-2 px-4 bg-slate-200 dark:bg-red-600 me-3">
              <div className="flex items-center">
                {/* <input
                  id="service-checkbox-2"
                  type="checkbox"
                  value="offline"
                  name="bordered-checkbox"
                  className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={mode.includes("offline")}
                  onChange={handleMode}
                /> */}
                <label
                  htmlFor="bordered-checkbox-1"
                  className="w-full ml-2 font-medium text-gray-900 dark:text-gray-300"
                >
                  Offline
                </label>
              </div>
            </div>
            )}
            <div className="flex items-center rounded-xl p-2 px-4 bg-slate-200 dark:bg-red-600 cursor-pointer"
                 onClick={handleContent}
            >
              <AiFillInfoCircle />
            </div>
          </div>
        </div>
      </div>
     {isContent && (
      <div  className="flex justify-center">
        <div className="w-full md:w-10/12 lg:w-8/12 flex  p-4 mt-4  text-red-800 rounded-lg bg-blue-50 dark:bg-slate-100 dark:text-red-600" role="alert">
          <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Modes:</span>
              <ul className="mt-1.5 ml-4 list-disc list-inside">
                <li>Online: "Face to face conversation."</li>
                <li>Offline: "Training session with 10 or more attendees."</li>
            </ul>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default InputModeUser;
