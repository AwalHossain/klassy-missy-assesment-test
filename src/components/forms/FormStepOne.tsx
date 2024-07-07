import React from 'react';
/* eslint-disable react/no-unescaped-entities */
import { Button } from "../ui/button";
import CharacterImage from "../ui/characterImage";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import FormInput from './FormInput';


interface FormProps {
    formData: {
        name: string;
        gender: string;
        concern: string;
        dateOfBirth: string;
    }
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleNext: () => void
}

export default function FormStepOne({ formData, handleInputChange, handleNext }: FormProps) {
    return (
        < div className="space-y-[18px]">

            <div className="mb-6 ">

                <h2 className="text-[15px] font-semibold text-center">Let's get started!</h2>
                <p className="text-center text-[10px]">
                    It'll take 2-3 minutes to understand you
                    and your skin concern.
                </p>
            </div>
            <CharacterImage />
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What do you like to be called? *</label>
                {/* <Input
                    type="text"
                    name="name"
                    placeholder="Enter your valid name"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e)}
                /> */}
                <FormInput name="name" type="text" placeholder="Enter your valid name" />
            </div>

            <div className="flex justify-between ">
                <div className="w-[145px]">

                    <label className="block text-sm font-medium text-gray-700 mb-1">I'm *</label>
                    {/* <Select

        options={[
            { value: 'female', label: 'Female' },
            { value: 'male', label: 'Male' },
        ]}
        value={formData.gender}
        onChange={(e) => handleInputChange({ target: { name: 'gender', value: e.target.value } })}
    /> */}
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-[145px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Seeking for *</label>
                    {/* <Select
        options={[
            { value: '', label: 'Select Concern' },
        ]}
        value={formData.concern}
        onChange={(e) => handleInputChange({ target: { name: 'concern', value: e.target.value } })}
    /> */}
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Concern" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="w-[145px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of birth *</label>
                <Input
                    className="font-normal text-[13px]"
                    placeholder="DD/MM/YYYY"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange(e)}
                />
                <p className="text-[#FF8A00] text-[8px] ">Who knows maybe a surprise waiting for you...</p>
            </div>
            <div className="mt-[24px] flex">

                <Button onClick={handleNext} className="mx-auto bg-black w-[67px] h-[25px] py-1 px-[18px]" >Next</Button>
            </div>
        </div>
    )
}
