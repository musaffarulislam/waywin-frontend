import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

interface Toaster {
  showToast: (message: string, options?: ToastOptions) => void;
}

const useToaster = (): Toaster => {
  const showToast = (message: string, options?: ToastOptions) => {
    const toastOptions: ToastOptions = {
      style: {
        fontSize: '1.2rem',
        ...(options?.style || {}),
      },
      ...options,
    };
    toast(message, toastOptions);
  };

  return {
    showToast,
  };
};

export default useToaster;