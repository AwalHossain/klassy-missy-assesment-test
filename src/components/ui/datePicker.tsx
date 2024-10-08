"use client"

import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useState } from "react"


export interface DatePickerProps {
    setValue: any;
}

export function DatePicker({ setValue }: DatePickerProps) {

    const [date, setDate] = useState<Date>()
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                {/* <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                        setDate(date)
                        setDate(date)
                    }}

                    initialFocus
                /> */}
                <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={date}
                    onSelect={(date) => {
                        setDate(date)
                        setDate(date)
                    }}
                    fromYear={1960}
                    toYear={2030}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
