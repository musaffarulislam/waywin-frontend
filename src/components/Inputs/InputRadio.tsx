import React, {  useState } from "react";
import { useSelector } from "react-redux";

type optionProps = {
    onOptionChange: (option: string) => void;
}

const InputRadio = ({ onOptionChange }: optionProps) => {
  const [selectedOption, setSelectedOption] = useState("User");

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const option = e.target.value;
    setSelectedOption(option);
    onOptionChange(option);
  };

  return (
    <div className="flex justify-center mb-2">
      <div className="w-full md:w-10/12 lg:w-8/12 grid grid-cols-2 space-x-2 rounded-xl  bg-gray-900 dark:bg-red-600 p-2"
        x-data="app">
        <div>
          <input
            type="radio"
            name="option"
            id="User"
            className="peer hidden"
            value="User"
            checked={selectedOption === "User"}
            onChange={handleOptionChange}
          />
          <label
            htmlFor="User"
            className="block cursor-pointer select-none rounded-xl p-2 text-center text-white peer-checked:bg-red-600 dark:peer-checked:bg-gray-900 peer-checked:font-bold peer-checked:text-white"
          >
            User
          </label>
        </div>

        <div>
          <input
            type="radio"
            name="option"
            id="Trainer"
            className="peer hidden"
            value="Trainer"
            checked={selectedOption === "Trainer"}
            onChange={handleOptionChange}
          />
          <label
            htmlFor="Trainer"
            className="block cursor-pointer select-none rounded-xl p-2 text-center text-white peer-checked:bg-red-600 dark:peer-checked:bg-gray-900 peer-checked:font-bold peer-checked:text-white"
          >
            Trainer
          </label>
        </div>

      </div>
    </div>
  );
};

export default InputRadio;
