import { format, isSameMinute, isSameDay } from "date-fns";
import { CheckCircle2 } from "lucide-react";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "./utils";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";

type hourProps = {
    onSelectedTime: (hour: Date) => void;
    availableDates: any;
    freeTimes: Date[];
    selectedDay: Date;
  }

const AvailableHours = memo(({ onSelectedTime , availableDates,freeTimes, selectedDay }: hourProps) => {

  const [selectedTime, setSelectedTime] = useState<Date>();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  
  
  useEffect(() => {
    if(selectedTime){
      onSelectedTime(selectedTime);
      console.log("selectedTime", selectedTime);
    }
  }, [selectedTime, onSelectedTime]);
  
  // useEffect(() => {
  //   setSelectedTime([]);
  // }, [freeTimes]);

  const handleTimeClick = (time: Date) => {
    setSelectedTime(time);
  };

  return (
    <div className="flex flex-col items-center text-orange-950 gap-2 mt-4 p-4">
      <span>
        Available times: <span className="font-semibold">{freeTimes.length}</span>
      </span>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 text-md gap-2">
        {availableDates.map((dateObj: any, index: number) => {
          const date = new Date(dateObj.date);
          const matchingTimes = dateObj.time.map((time: string) => new Date(time));

          if (!isSameDay(date, selectedDay)) {
            return null // Skip rendering for non-matching dates
          }

          return (
            <>
              {matchingTimes.map((time: Date, timeIndex: number) => (
                <button
                  key={timeIndex}
                  type="button"
                  className={cn(
                    "bg-green-200 rounded-lg px-2 text-gray-800 relative hover:border hover:border-green-400 w-[60px] h-[26px]",
                    selectedTime && "bg-green-400 text-gray-800"
                  )}
                  onClick={() => handleTimeClick(time)}
                >
              <CheckCircle2
                className={cn(
                  "w-[16px] h-[16px] absolute hidden top-0 right-0 transform translate-x-1 -translate-y-1.5 text-green-700",
                  selectedTime && isSameMinute(selectedTime, time) ? "block" : "hidden"
                )}
              />
                  {format(time, "HH:mm")}
                </button>
              ))}
              </> 
          );
        })}


      </div>
      {selectedTime && (
        <div className="w-full text-rose-950 pt-6">
          <span className="flex justify-center">Available times: </span>
          <ul className="flex flex-wrap justify-center">
              <li>{format(selectedTime, "HH:mm")} ,</li>
          </ul>
        </div>
      )}
    </div>
  );
});

export default AvailableHours;
