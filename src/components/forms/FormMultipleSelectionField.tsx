import { getErrorMessageByPropertyName } from "@/lib/getErrorMessageByPropertyName";
import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input } from "../ui/input";

interface MultipleSelectionProps {
    name: string;
    options: { label: string, value: string }[];
    label?: string;
    placeholder?: string;
}

const FormMultipleSelectionField = ({
    name,
    options,
    label,
    placeholder = "Select",
}: MultipleSelectionProps) => {
    const { control, formState: { errors }, setValue, watch } = useFormContext();
    const fieldValue = watch(name);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [query, setQuery] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (fieldValue) {
            setSelectedOptions(fieldValue);
        }
    }, [fieldValue]);

    const filteredOptions = options.filter(
        (option) =>
            option.label.toLowerCase().includes(query.toLowerCase().trim()) &&
            !selectedOptions.includes(option.value)
    );

    const handleOptionChange = (newOption: string[]) => {
        setSelectedOptions(newOption);
        setValue(name, newOption);
        setQuery("");
        setMenuOpen(false);
    };

    const handleRemoveOption = (optionToRemove: string) => {
        const newOptions = selectedOptions.filter(option => option !== optionToRemove);
        setSelectedOptions(newOptions);
        setValue(name, newOptions);
    };

    const errorMessage = getErrorMessageByPropertyName(errors, name);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="w-full max-w-md">
                    {label && <label className="block mb-2 text-sm font-medium">{label}</label>}
                    <div className="relative">
                        {selectedOptions.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                                {selectedOptions.map((option) => (
                                    <div key={option} className="flex items-center bg-red-100 text-red-600 rounded-full px-3 py-1 text-sm">
                                        {option}
                                        <button onClick={() => handleRemoveOption(option)} className="ml-1">&times;</button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div className="">
                            <Input
                                type="text"
                                ref={inputRef}
                                placeholder={placeholder}
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onFocus={() => setMenuOpen(true)}
                                onBlur={() => setTimeout(() => setMenuOpen(false), 200)}
                            />
                        </div>
                        {menuOpen && filteredOptions.length > 0 && (
                            <ul className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                                {filteredOptions.map((option) => (
                                    <li
                                        key={option.value}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            handleOptionChange([...selectedOptions, option.value]);
                                            inputRef.current?.blur();
                                        }}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        {option.label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    {errorMessage && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}
                </div>
            )}
        />
    );
};

export default FormMultipleSelectionField;
