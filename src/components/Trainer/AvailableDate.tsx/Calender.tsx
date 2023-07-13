import { useCallback, useEffect, useMemo, useState } from "react"
import { cn, dayNames } from "./utils/utils"
import {
  add,
  addDays,
  addHours,
  eachDayOfInterval,
  eachMinuteOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isAfter,
  isBefore,
  isEqual,
  isSameMonth,
  isThisMonth,
  isToday,
  parse,
  parseISO,
  set,
  startOfDay,
  startOfToday,
  startOfWeek,
  startOfYesterday,
} from "date-fns"
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"
import AvailableHours from "./utils/hours"
import Swal from "sweetalert2"
import { addAvailableDate, getTrainerAvailableDates } from "../../../app/slices/trainerSlice"
import { useDispatch, useSelector } from "react-redux"
import { ThunkDispatch } from "@reduxjs/toolkit"
import useToaster from "../../../hooks/useToast"

const reservations = [
  addDays(new Date(addHours(startOfToday(), 4)), 3).toString(),
]

export default function Calander() {
  
  const [calendarTouched, setCalendarTouched] = useState<Boolean>(false)

  const toaster = useToaster();

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  const availableDates: any = useSelector((state: any)=> state.trainer.availabeDates)

  let today = startOfToday()
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"))
  let [selectedDay, setSelectedDay] = useState(today)
  let [selectedHours, setSelectedHours] = useState<Date[]>([])
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date())

  let days = useMemo(() => eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth), { weekStartsOn: 1 }),
  }), [firstDayCurrentMonth])

  const [availableTimesInThisMonth, setAvailableTimesInThisMonth] = useState<
    number[]
    >([])

  function prevMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"))
  }

  const freeTimes = useMemo(() => {
    const StartOfToday = startOfDay(selectedDay)
    const endOfToday = endOfDay(selectedDay)
    const startHour = set(StartOfToday, { hours: 8 })
    const endHour = set(endOfToday, { hours: 19})
    let hoursInDay = eachMinuteOfInterval(
      {
        start: startHour,
        end: endHour,
      },
      { step: 60 }
    )
    let freeTimes = hoursInDay.filter(
      (hour) => !reservations.includes(parseISO(hour.toISOString()).toString())
    )
    return (freeTimes)
  }, [selectedDay])

  useMemo(() => {
    let thisMonthTimesLength: number[] = []
    let thisMonthTimesEachDay: Date[][] = []
    days.map((day: Date): void => {
      const StartOfToday = startOfDay(day)
      const endOfToday = endOfDay(day)
      // change your working hours here
      const startHour = set(StartOfToday, { hours: 8 })
      const endHour = set(endOfToday, { hours: 19})
      let hoursInDay = eachMinuteOfInterval(
        {
          start: startHour,
          end: endHour,
        },
        { step: 60 }
      )
      let freeTimes = hoursInDay.filter(
        (hour) =>
          !reservations.includes(parseISO(hour.toISOString()).toString())
      )
      thisMonthTimesLength.push(freeTimes.length)
      thisMonthTimesEachDay.push(freeTimes)
    })
    setAvailableTimesInThisMonth(thisMonthTimesLength)
  }, [currentMonth])

  useEffect(() => {
    dispatch(getTrainerAvailableDates())
  }, [dispatch, selectedDay]);

  const handlehours = useCallback((hours: Date[]) => {
    setSelectedHours(hours);
    console.log(hours)
  },[]);
 
  const handleSubmit = async() => {
    try{
      await Swal.fire({
        title: 'Are you sure?',
        text: "Adding new available date and times!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, verify it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log("23456 Selected day :",selectedDay)
            await dispatch(addAvailableDate({selectedDay, selectedHours}));
            // await dispatch(getAllTags());
            Swal.fire({
                title: 'Added!',
                text: 'Date and time added',
                icon: 'success',
                timer: 1000, 
                timerProgressBar: true, 
                didOpen: () => {
                  Swal.showLoading();
                },
                willClose: () => {
                  // setIsModal(false)
                },
            });
        }else{
          // setIsModal(false)
        }
      })
    } catch (error: any) {
      toaster.showToast(error.message, { type: 'error' })
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 bg-stone-50">

      <div className="flex flex-col gap-2 w-3/4 mt-12">
        {/* calendar header */}
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

        {/* calendar body */}
        <div>
          <div className="grid grid-cols-7 mt-4">
            {dayNames.map((day, i) =>
            {
              return(
              <div
                key={i}
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
                  key={day.toString()}
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
                      // isBefore(day, today) && "cursor-not-allowed",
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
                    {isAfter(day, startOfYesterday()) && isBefore(day, addDays(today, 7)) && (
                      <span className="hidden group-hover:flex absolute top-0 -translate-x-.5 -translate-y-4 z-10 text-[11px] bg-slate-900 text-slate-300 px-1 rounded-md gap-1">
                        <span>{availableTimesInThisMonth[dayIdx]}</span>
                        <span>Available</span>
                      </span>
                    )}

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
            Select your available time slots
            <span className="font-semibold pl-1">
              {format(selectedDay, "dd MMMM yyyy").toString()}
            </span>
          </span>
        </span>
        
        <AvailableHours onSelectedTime={handlehours} freeTimes={freeTimes} selectedDay={selectedDay} />
      </div>
      <div>
        {selectedHours && selectedHours.length>0 &&
        <button className="bg-red-600 text-white dark:bg-blue-800  p-3 px-6 mb-8 rounded-xl text-2xl flex items-center justify-center"
        onClick={handleSubmit}
        >
          Submit
        </button>
        }
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