import React, { useEffect, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";

type optionProps = {
  onOptionServices: (option: string) => void;
  services: string[],
  error?: string;
};

const InputServices = ({ onOptionServices, services, error }: optionProps) => {
  
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string | null>(null);

  useEffect(() => {
    if(selectedCheckboxes){
      onOptionServices(selectedCheckboxes)
    }
  }, [selectedCheckboxes, onOptionServices]);


  const [isPopup, setIsPopup] = useState(false);

  const handlePopup = () =>{
    setIsPopup(!isPopup)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxValue = event.target.value;
    setSelectedCheckboxes(checkboxValue)
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        <div className="w-full md:w-10/12 lg:w-8/12 text-2xl flex flex-row sm:flex-col md:flex-row gap-4 items-center justify-center "
          x-data="app"
        >
          {services &&
          services.map((service, index)=>{
            return(
          <div key={index} className="rounded-xl p-2 px-4 bg-slate-200 dark:bg-red-600 mb-0 sm:mb-6 md:mb-0">
            <div className="flex items-center ">
              <input
                id={`services-${index}`}
                type="radio"
                value={service}
                name="service-radio"
                className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                checked={selectedCheckboxes === service}
                onChange={handleChange}
              />
              <label
                htmlFor={`services-${index}`}
                className="w-full ml-2 font-medium text-gray-900 dark:text-gray-300"
                >
                {service}
              </label>
            </div>
          </div>
          )})}
          <div className="flex ms-6 sm:ms-0 md:ms-6">
           <div className="flex items-center rounded-xl p-4 bg-slate-200 dark:bg-red-600"
                 onClick={()=>handlePopup()}
            >
              <AiFillInfoCircle />
            </div>
          </div>
        </div>
      </div>
      {error && <p className="text-lg text-red-500 mt-2 flex items-center justify-center">{error}</p>}
      {isPopup && (
      <div  className="flex justify-center">
        <div className="w-full md:w-10/12 lg:w-8/12 flex  p-4 mb-4  text-red-800 rounded-lg bg-blue-50 dark:bg-slate-100 dark:text-red-600" role="alert">
          <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Services:</span>
              <ul className="mt-1.5 ml-4 list-disc list-inside">
                <li>Consulting: "Face to face conversation."</li>
                <li>Training: "Training session with 10 or more attendees."</li>
            </ul>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default InputServices;
