import { toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

interface Toaster {
  showToast: (message: string, options?: ToastOptions) => void;
}

const useToaster = (): Toaster => {
  const showToast = (message: string, options?: ToastOptions) => {
    toast(message,{ ...options,
      style: {
        fontSize: '1.2rem', // Increase the font size to 1.2rem
        ...options?.style,
      },
    });
  };

  return {
    showToast,
  };
};

export default useToaster;