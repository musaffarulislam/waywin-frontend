import React from "react";

type optionProps = {
  onOptionDescription: (option: string) => void;
  label: string;
  error: string | undefined
}

const InputText = ({onOptionDescription, label, error}: optionProps) => {
  const [password, setPasswordValue] = React.useState("password");



  return (
    <div className="my-2 flex justify-center text-3xl">
      <div className="w-full md:w-10/12 lg:w-8/12">
        <label className="text-2xl">{label}</label>
        <textarea
          id="message"
          rows={4}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your thoughts here..."
        ></textarea>
        {error && <p className="text-lg text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default InputText;
