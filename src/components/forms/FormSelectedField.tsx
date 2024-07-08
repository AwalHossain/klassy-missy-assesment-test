'use client'
import { getErrorMessageByPropertyName } from "@/lib/getErrorMessageByPropertyName";
import { Controller, useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


interface SelectOptions {
    label: string;
    value: string;
}

interface IInput {
    options: SelectOptions[];
    name: string;
    size?: "large" | "small";
    value?: string | string[] | undefined;
    placeholder?: string;
    label?: string;
    defaultValue?: SelectOptions;
}

const FormSelectedField = ({
    name,
    size = "large",
    value,
    placeholder = "Select",
    options,
    label,
    defaultValue,
}: IInput) => {
    const { control, formState: { errors } } = useFormContext();
    const errorMessage = getErrorMessageByPropertyName(errors, name)


    return (
        <div>
            {label ? (<label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>) : null}
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <Select onValueChange={onChange} value={value}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {options.map((option, index) => (
                                <div key={index}>
                                    <SelectItem value={option.value}>{option.label}</SelectItem>
                                </div>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            <small style={{ color: "red" }}>{errorMessage}</small>
        </div>
    )
}

export default FormSelectedField;