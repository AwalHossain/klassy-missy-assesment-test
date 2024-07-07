
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

type UMDatePickerProps = {
    onChange?: (valOne: Date | null, valTwo: string) => void;
    name: string;
    label?: string;
    value?: Date;
    size?: "large" | "small";
    defaultValue?: Date;
};

const FormDatePicker = ({
    name,
    label,
    onChange,
    value,
    defaultValue,
}: UMDatePickerProps) => {
    const { control, setValue, getValues } = useFormContext();
    const [date, setDate] = useState<Date | undefined>(defaultValue || value);

    // Set the default value on initial render
    useEffect(() => {
        if (defaultValue) {
            const formattedDate = format(defaultValue, "yyyy-MM-dd");
            setValue(name, formattedDate);
            setDate(defaultValue);
        }
    }, [defaultValue, name, setValue]);

    useEffect(() => {
        setDate(value);
    }, [value]);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            const formattedDate = format(selectedDate, "yyyy-MM-dd");
            setDate(selectedDate);
            setValue(name, formattedDate);
            if (onChange) {
                onChange(selectedDate, formattedDate);
            }
        } else {
            setDate(undefined);
            setValue(name, undefined);
            if (onChange) {
                onChange(null, '');
            }
        }
    };

    return (
        <div>
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
            <Controller
                name={name}
                control={control}
                defaultValue={format(defaultValue || new Date(), "yyyy-MM-dd")} // Use defaultValue or current date as fallback
                render={({ field }) => (
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
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={handleDateSelect}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                )}
            />
        </div>
    );
};

export default FormDatePicker;