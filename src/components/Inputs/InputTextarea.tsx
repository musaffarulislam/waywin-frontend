import React, { useState } from "react";

type optionProps = {
  onTextDescription: (option: string) => void;
  label: string;
  name?: string;
  error: string | undefined
}

const InputTextarea = ({onTextDescription, label, name, error}: optionProps) => {
  const [descriptionText, setDescriptionText] = useState("");

  const handleOptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const option = e.target.value;
    console.log("option desctiption :",option)
    setDescriptionText(option);
    onTextDescription(option);
  };



  return (
    <div className="my-2 flex justify-center text-3xl">
      <div className="w-full md:w-10/12 lg:w-8/12">
        <label className="text-2xl">{label}</label>
        <textarea
          id="message"
          name={name}
          rows={4}
          className="block p-2.5 w-full mt-2 text-2xl text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleOptionChange}
          placeholder="Write your thoughts here..."
        ></textarea>
        {error && <p className="text-lg text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default InputTextarea;
