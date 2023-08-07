import { useCallback, useEffect, useMemo, useState } from "react"
import { cn, dayNames } from "./utils/utils"
import {
  add,
  addDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isBefore,
  isEqual,
  isSameMonth,
  isThisMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns"
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import AvailableHours from "./utils/hours"


type calenderProps ={
  availableDates: any,
  onCalander: (date: any) => void;
}

export default function Calander({availableDates, onCalander}: calenderProps) {
  
  const [calendarTouched, setCalendarTouched] = useState<Boolean>(false)

  let today = startOfToday()
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"))
  let [selectedDay, setSelectedDay] = useState(today)
  let [selectedHours, setSelectedHours] = useState<Date | null>(null)
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date())

  let days = useMemo(() => eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  }), [firstDayCurrentMonth])


  function prevMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
  }


  useEffect(() => {
    if(selectedDay && selectedHours !== null){
      onCalander({date:selectedDay, time:selectedHours})
    }
  }, [onCalander, selectedDay, selectedHours]);

  const handlehours = useCallback((hours: Date) => {
    setSelectedHours(hours); 
  },[]);


  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-stone-50 mt-6">
        <div className="flex flex-col gap-2 w-3/4 mt-12"> 
          <div className="grid grid-cols-3">
            <button
              type="button"
              onClick={prevMonth}
              disabled={isThisMonth(new Date(currentMonth))}
            >
              <ChevronLeft
                size={20}
                aria-hidden="true"
                className="text-slate-800"
              />
            </button>
            <h2 className="font-semibold text-orange-950 justify-center flex">
              {format(firstDayCurrentMonth, " MMMM yyyy")}
            </h2>
            <button
              type="button"
              className="flex justify-end"
              onClick={nextMonth}
            >
              <ChevronRight size={20} aria-hidden="true" className="text-slate-800"/>
            </button>
          </div>
 
          <div>
            <div className="grid grid-cols-7 mt-4">
              {dayNames.map((day, dayIdx) =>
              {
                return(
                <div
                  key={dayIdx}
                  className={cn(
                    "flex justify-center items-center text-sm text-blue-500 w-full py-2",
                    {
                      "text-orange-400 bg-orange-100 rounded-t-lg":
                        day === "Sun",
                    }
                  )}
                >
                  {day}
                </div>
              )})}
            </div>

            <div className="grid grid-cols-7 text-sm">
              {days.map((day, dayIdx) => {
                const isSelectable = isBefore(day, addDays(today, 7));
                return (
                  <div
                    key={dayIdx}
                    className={cn(
                      dayIdx === 0 && colStartClasses[getDay(day) - 1],
                      "h-14 justify-center flex items-center",
                      (getDay(day) === 0) &&
                        "bg-orange-100 rounded-lg"
                    )}
                  >
                    <button
                      onClick={() => {
                        setCalendarTouched(true)
                        setSelectedDay(day)
                      }}
                      className={cn(
                        "w-12 h-12 flex flex-col p-2 justify-center items-center rounded-xl gap-0 group bg-blue-100 relative group", 
                        isEqual(day, selectedDay) &&
                          "bg-red-100 text-slate-900 text-lg",
                        isEqual(today, day) && "text-blue-900 bg-blue-100 border border-blue-700",
                        isBefore(day, today) &&
                          "text-gray-400 bg-gray-100 cursor-not-allowed",
                        isEqual(today, day) && "text-blue-900 bg-blue-100",
                        !isSelectable && "text-gray-400 bg-gray-100 cursor-not-allowed",  
                        isEqual(day, selectedDay) &&
                          isToday(day) &&
                          "bg-blue-200",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-400",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          "text-gray-800"
                      )}
                      disabled={!isSelectable}
                    >

                      <time
                        dateTime={format(day, "yyyy-MM-dd")}
                        className={cn(
                          "group-hover:text-lg",
                          (isEqual(day, selectedDay) || isToday(day)) &&
                            "font-semibold"
                        )}
                      >
                        {format(day, "d")}
                      </time>

                      <CheckCircle2
                        className={cn(
                          "hidden",
                          isEqual(day, selectedDay) &&
                            "absolute block top-0 right-0 h-[14px] w-[14px] translate-x-1 -translate-y-1 text-orange-900",
                          isEqual(day, today) && "text-blue-900"
                        )}
                      />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className={cn(calendarTouched && "block")}>
          <span className="flex items-center w-full justify-center gap-1">
            <span className="text-slate-900">
              Select your booking time slots
              <span className="font-semibold pl-1">
                {format(selectedDay, "dd MMMM yyyy").toString()}
              </span>
            </span>
          </span>
          
          <AvailableHours onSelectedTime={handlehours} availableDates={availableDates} selectedDay={selectedDay} />
        </div>
    </div>
  )
}
 
let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
]