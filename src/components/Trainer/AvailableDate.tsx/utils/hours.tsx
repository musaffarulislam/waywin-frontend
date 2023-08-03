import { format, isSameMinute, isSameDay } from "date-fns";
import { CheckCircle2 } from "lucide-react";
import React, { memo, useEffect, useState } from "react";
import { cn } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getTrainerAvailableDates } from "../../../../app/slices/trainerSlice";

type hourProps = {
    onSelectedTime: (hour: Date[]) => void;
    freeTimes: Date[];
    selectedDay: Date;
  }

const AvailableHours = memo(({ onSelectedTime ,freeTimes, selectedDay }: hourProps) => {

  const [selectedTimes, setSelectedTimes] = useState<Date[]>([]);

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const availableDates: any = useSelector((state: any)=> state.trainer.availabeDates)

  useEffect(() => {
    dispatch(getTrainerAvailableDates())
  }, [dispatch]);

  useEffect(() => { 
    const formattedSelectedDay = new Date(selectedDay.getTime() - selectedDay.getTimezoneOffset() * 60000); 
  
    if (Array.isArray(availableDates) && availableDates.length > 0) {
      const matchingDate = availableDates.find((dateObj: any) => {
        const date = new Date(dateObj.date);
        date.setUTCHours(0, 0, 0, 0);
        return isSameDay(date, formattedSelectedDay);
      });
   
      if (matchingDate && Array.isArray(matchingDate.time)) {
        const matchingTimes = matchingDate.time.map((time: string) => new Date(time));
        setSelectedTimes(matchingTimes);
      } else { 
        setSelectedTimes([]);
      }
    } else { 
      setSelectedTimes([]);
    }
  }, [availableDates, selectedDay]);
  
  useEffect(() => {
    onSelectedTime(selectedTimes); 
  }, [selectedTimes, onSelectedTime]);
  
  // useEffect(() => {
  //   setSelectedTimes([]);
  // }, [freeTimes]);

  const handleTimeClick = (time: Date) => {
    setSelectedTimes((prevSelectedTimes) => {
      const isTimeSelected = prevSelectedTimes.some((selectedTime) => isSameMinute(selectedTime, time));
  
      if (isTimeSelected) {
        const updatedTimes = prevSelectedTimes.filter((selectedTime) => !isSameMinute(selectedTime, time));
        return updatedTimes;
      } else {
        const updatedTimes = [...prevSelectedTimes, time];
        return updatedTimes.sort((a, b) => a.getTime() - b.getTime());
      }
    });
  };

  return (
    <div className="flex flex-col items-center text-orange-950 gap-2 mt-4 p-4">
      <span>
        Available times: <span className="font-semibold">{freeTimes.length}</span>
      </span>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 text-md gap-2">
        {freeTimes.map((time, index) => (
          <div key={index}>
            <button
              type="button"
              className={cn(
                "bg-green-200 rounded-lg px-2 text-gray-800 relative hover:border hover:border-green-400 w-[60px] h-[26px]",
                selectedTimes.some((selectedTime) => isSameMinute(selectedTime, time)) &&
                  "bg-green-400 text-gray-800"
              )}
              onClick={() => handleTimeClick(time)}
            >
              <CheckCircle2
                className={cn(
                  "w-[16px] h-[16px] absolute hidden top-0 right-0 transform translate-x-1 -translate-y-1.5 text-green-700",
                  selectedTimes.some((selectedTime) => isSameMinute(selectedTime, time)) &&
                    "block"
                )}
              />
              {format(time, "HH:mm")}
            </button>
          </div>
        ))}
      </div>
      {selectedTimes.length > 0 && (
        <div className="w-full text-rose-950 pt-6">
          <span className="flex justify-center">Available times: </span>
          <ul className="flex flex-wrap justify-center">
            {selectedTimes.map((selectedTime, index) => (
              <li key={index}>{format(selectedTime, "HH:mm")} ,</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default AvailableHours;
