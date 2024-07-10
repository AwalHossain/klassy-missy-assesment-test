import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type FormDatePickerProps = {
    name: string;
    label?: string;
    defaultValue?: Date;
};

const FormDatePicker = ({
    name,
    label,
    defaultValue,
}: FormDatePickerProps) => {
    const { control, formState: { errors } } = useFormContext();
    const [calendarOpen, setCalendarOpen] = useState(false);
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                captionLayout="dropdown-buttons"
                                selected={field.value}
                                onSelect={(date) => {
                                    field.onChange(date);
                                    setCalendarOpen(false);
                                }}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01")
                                }
                                fromYear={1960}
                                toYear={2030}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                )}
            />
            {errors[name] && (
                <small className="text-red-500 mt-1">
                    {errors[name]?.message as string}
                </small>
            )}
        </div>
    );
};

export default FormDatePicker;