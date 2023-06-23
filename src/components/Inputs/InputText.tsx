import React from "react";
import { UseFormRegister } from "react-hook-form";

type InputProps = {
  label: string;
  name: string;
  type: string;
  register: UseFormRegister<any>;
  required: boolean;
  disabled?: boolean,
  error: string | undefined;
};

const InputText = ({
  label,
  name,
  register,
  type,
  disabled,
  required,

  error,
}: InputProps) => {
  const [password, setPasswordValue] = React.useState("password");

  const toggle = () => {
    if (password === "password") {
      setPasswordValue("text");
      return;
    }
    setPasswordValue("password");
  };

  return (
    <div className="my-2 flex justify-center text-3xl">
      <div className="w-full md:w-10/12 lg:w-8/12">
        <label className="text-2xl">{label}</label>
        <div className="flex relative">
          <input
            type={type !== "password" ? type : password}
            className={`w-full text-gray-700 rounded-lg p-3 mt-2 border-transparent text-2xl bg:white dark:bg-slate-200 ${disabled && "disabled:bg-slate-100 disabled:cursor-not-allowed"}`}
            {...register(name, { required })}
            disabled={disabled} 
          />
          {type === "password" && (
            <button
              type="button"
              className="btn absolute flex right-5 transform translate-y-6"
              onClick={toggle}
            >
              {password === "password" ? (
                <svg
                  width="20"
                  height="17"
                  fill="currentColor"
                  className="bi bi-eye-slash-fill text-sky-950"
                  viewBox="0 0 16 16"
                >
                  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="17"
                  fill="currentColor"
                  className="bi bi-eye-fill  text-sky-950"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>
              )}
            </button>
          )}
        </div>
        {error && <p className="text-lg text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default InputText;
