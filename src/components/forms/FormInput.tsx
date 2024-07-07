'use client'

import { getErrorMessageByPropertyName } from "@/lib/getErrorMessageByPropertyName";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

interface IInput {
    name: string;
    type?: string;
    size?: 'large' | 'small';
    placeholder?: string;
    value?: string | string[] | undefined;
    id?: string;
    validation?: object;
    label?: string;
    className?: string;
}




const FormInput = ({
    name,
    type,
    size,
    placeholder,
    value,
    id,
    validation,
    label,
    className
}: IInput) => {


    const { control, formState: { errors } } = useFormContext();
    const errorMessage = getErrorMessageByPropertyName(errors, name)

    return (
        <>
            {label ? (<label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>) : null}
            <Controller
                control={control}
                name={name}
                render={({ field }) =>
                (
                    <Input
                        type={type}
                        className={className}
                        placeholder={placeholder}
                        {...field}
                        value={value ? value : field.value}
                    />
                )
                }
            />
            <small style={{ color: "red" }}>{errorMessage}</small>
        </>
    )
}

export default FormInput