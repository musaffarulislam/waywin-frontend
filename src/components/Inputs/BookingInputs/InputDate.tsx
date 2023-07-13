import React, { useState } from 'react'
import Calander from '../../User/TrainerInfo/AvailableDate/Calender';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { IDate } from '../../../utils/entity/TrainerEntity';

type optionProps = {
    onOptionDate: (option: IDate) => void;
    availableDates: any,
    error?: string;
  };

export const InputDate = ({onOptionDate, availableDates, error}:optionProps) => {

    const [isDate, setIsDate] = useState<boolean>(false)

    const handleCalender = () =>{
        setIsDate(!isDate);
    }
   
    const handleDate = (date: any) =>{
      onOptionDate(date);
    }
  return (
    <div>
        <div className="flex justify-center mt-4">
            <button className="flex gap-3 items-center rounded-xl text-2xl p-2 px-4 bg-slate-200 dark:bg-red-600 mb-0 sm:mb-6 md:mb-0" onClick={handleCalender}>Select Date {isDate? <AiFillCaretUp /> : <AiFillCaretDown />} </button>
        </div>
        {isDate && (
          <Calander onCalander={handleDate} availableDates={availableDates} />
        )}
        <div className='flex justify-center'>
          {error && <p className="text-lg text-red-500 mt-2">{error}</p>}
        </div>
    </div>
  )
}
