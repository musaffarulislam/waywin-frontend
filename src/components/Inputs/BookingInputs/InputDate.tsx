import React, { useState } from 'react'
import Calander from '../../User/TrainerInfo/AvailableDate/Calender';

type optionProps = {
    onOptionDate: (option: string) => void;
    availableDates: any,
    error?: string;
  };

export const InputDate = ({onOptionDate, availableDates, error}:optionProps) => {

    const [isDate, setIsDate] = useState<boolean>(false)

    const handleDate = () =>{
        setIsDate(!isDate);
    }
  return (
    <div>
        <div className="flex justify-center mb-4">
            <button onClick={handleDate}>Available Date</button>
        </div>
        {isDate && (
          <Calander availableDates={availableDates} />
        )}
    </div>
  )
}
