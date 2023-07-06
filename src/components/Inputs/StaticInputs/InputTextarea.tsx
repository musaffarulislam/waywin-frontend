import React from "react";

type optionProps = {
  description: string | undefined;
  label: string;
  name?: string;
}

const InputTextarea = ({description, label, name}: optionProps) => {


  return (
    <div className="my-2 flex justify-center text-xl">
      <div className="w-full ">
        <label className="text-xl">{label}</label>
        <textarea
          id="message" 
          name={name} 
          rows={4}
          className="block p-2.5 w-full mt-2 text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 cursor-not-allowed"
          value={description}
          placeholder="No description"
          disabled
        ></textarea>
      </div>
    </div>
  );
};

export default InputTextarea;
