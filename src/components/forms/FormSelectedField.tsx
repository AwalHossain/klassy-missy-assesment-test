import { getErrorMessageByPropertyName } from "@/lib/getErrorMessageByPropertyName";
import Image from 'next/image';
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
    imageSrc?: string;
    className?: string;
}

const FormSelectedField = ({
    name,
    size = "large",
    value,
    placeholder = "Select",
    options,
    label,
    defaultValue,
    imageSrc,
    className,
}: IInput) => {
    const { control, formState: { errors } } = useFormContext();
    const errorMessage = getErrorMessageByPropertyName(errors, name);

    return (
        <div className="relative">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            )}
            <div className="flex items-center">
                <div className="flex-grow">
                    <Controller
                        control={control}
                        name={name}
                        render={({ field: { onChange, value } }) => (
                            <Select onValueChange={onChange} value={value}>
                                <SelectTrigger className={className}>
                                    <SelectValue placeholder={placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                    {options.map((option, index) => (
                                        <SelectItem key={index} value={option.value}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
                {imageSrc && (
                    <div className="ml-4 flex items-center">
                        <Image src={imageSrc} alt="icon" width={30} height={30} />
                    </div>
                )}
            </div>
            {errorMessage && (
                <small className="text-red-500 mt-1 block">{errorMessage}</small>
            )}
        </div>
    );
};

export default FormSelectedField;