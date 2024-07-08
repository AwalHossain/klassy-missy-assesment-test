'use client'
import { getErrorMessageByPropertyName } from "@/lib/getErrorMessageByPropertyName";
import { Controller, useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";


interface IInput {
    name: string;
    size?: "large" | "small";
    value?: string | string[] | undefined;
    placeholder?: string;
    label?: string;
    rows?: number;
    className?: string;
}

const FormTextArea = ({
    name,
    size = "large",
    value,
    placeholder = "",
    rows,
    label,
    className
}: IInput) => {

    const { control, formState: { errors } } = useFormContext();
    const errorMessage = getErrorMessageByPropertyName(errors, name)

    return (
        <div>
            {label ? (<label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>) : null}
            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <Textarea
                        placeholder={placeholder}
                        {...field}
                        value={value ? value : field.value}
                        className={className}
                    />
                )}

            />
            <small style={{ color: "red" }}>{errorMessage}</small>
        </div>

    )
}


export default FormTextArea;