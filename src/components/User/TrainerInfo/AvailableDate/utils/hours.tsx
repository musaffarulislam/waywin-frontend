import { format, isSameMinute, isSameDay } from "date-fns";
import { CheckCircle2 } from "lucide-react";
import React, { memo, useEffect, useState } from "react";
import { cn } from "./utils";
type hourProps = {
    onSelectedTime: (hour: Date) => void;
    availableDates: any;
    selectedDay: Date;
  }

const AvailableHours = memo(({ onSelectedTime , availableDates, selectedDay }: hourProps) => {

  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  
  useEffect(() => {
    if(selectedTime){
      onSelectedTime(selectedTime);
      console.log("selectedTime", selectedTime);
    }
  }, [selectedTime, onSelectedTime]);
  
  useEffect(() => {
    setSelectedTime(null)
  }, [selectedDay]);

  const handleTimeClick = (time: Date) => {
    if(selectedTime === time){
      setSelectedTime(null);
    }else{
      setSelectedTime(time);
    }
  };


  return (
    <div className="flex flex-col items-center text-orange-950 gap-2 mt-4 p-4">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 text-md gap-2">
        {availableDates.map((dateObj: any, dateIndex: number) => {
          const date = new Date(dateObj.date);
          const matchingTimes = dateObj.time.map((time: string) => new Date(time));

          if (!isSameDay(date, selectedDay)) {
            return null // Skip rendering for non-matching dates
          }

          return (
            <React.Fragment key={dateIndex}>
              {matchingTimes.map((time: Date, timeIndex: number) => (
                <button
                  key={timeIndex}
                  type="button"
                  className={cn(
                    " rounded-lg px-2 text-gray-800 relative hover:border hover:border-green-400 w-[60px] h-[26px]",
                    selectedTime && isSameMinute(selectedTime, time) ? "bg-green-500 text-gray-800" : "bg-green-300"
                  )}
                  onClick={() => handleTimeClick(time)}
                >
              <CheckCircle2
                className={cn(
                  "w-[16px] h-[16px] absolute hidden top-0 right-0 transform translate-x-1 -translate-y-1.5",
                  selectedTime && isSameMinute(selectedTime, time) ? "block text-green-700" : "hidden"
                )}
              />
                  {format(time, "HH:mm")}
                </button>
              ))}
              </React.Fragment> 
          );
        })}
      </div>
      {selectedTime ? (
        <div className="w-full text-rose-950 pt-6">
          <span className="flex justify-center">Available times: </span>
          <ul className="flex flex-wrap justify-center">
              <li>{format(selectedTime, "HH:mm")} ,</li>
          </ul>
        </div>
      ):(
        <div className="w-full text-rose-950 pt-6">
          <span className="flex justify-center">No selected times </span>
        </div>
      )}
    </div>
  );
});

export default AvailableHours;
