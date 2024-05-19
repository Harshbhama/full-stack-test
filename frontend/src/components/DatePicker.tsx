"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const DatePicker: React.FC<any> = ({setDateInFormat}) => {
  const [date, setDate] = React.useState<Date>(new Date())
  console.log("date",date);
  
  useEffect(() => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Adding 1 because getMonth() is zero-indexed
    const day = date.getDate();
    setDateInFormat({
      year: year,
      month: month,
      day: day
    })
  },[date])
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          // @ts-ignore
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
export default DatePicker;
