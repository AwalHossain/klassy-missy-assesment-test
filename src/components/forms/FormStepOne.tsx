import React from 'react';
/* eslint-disable react/no-unescaped-entities */
import { Button } from "../ui/button";
import CharacterImage from "../ui/characterImage";
import FormDatePicker from './FormDatePicker';
import FormInput from './FormInput';
import FormSelectedField from './FormSelectedField';


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

const genderOptions =
    [
        { value: 'female', label: 'Female' },
        { value: 'male', label: 'Male' },
    ]
/**
 * concern 
 * Acne & breakouts

Blackheads

Dry skin


Fine lines & wrinkles

Dehydrated skin

Dull Skin

Redness

Excess oil

Uneven skin texture

Acne scars

Acne Spot

Hyperpigmentation
 */
const concernOptions = [
    { value: 'Acne & breakouts', label: 'Acne & breakouts' },
    { value: 'Blackheads', label: 'Blackheads' },
    { value: 'Dry skin', label: 'Dry skin' },
    { value: 'Fine lines & wrinkles', label: 'Fine lines & wrinkles' },
    { value: 'Dehydrated skin', label: 'Dehydrated skin' },
    { value: 'Dull Skin', label: 'Dull Skin' },
    { value: 'Redness', label: 'Redness' },
    { value: 'Excess oil', label: 'Excess oil' },
    { value: 'Uneven skin texture', label: 'Uneven skin texture' },
    { value: 'Acne scars', label: 'Acne scars' },
    { value: 'Acne Spot', label: 'Acne Spot' },
    { value: 'Hyperpigmentation', label: 'Hyperpigmentation' },
]

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
                {/* <Input
                    type="text"
                    name="name"
                    placeholder="Enter your valid name"
                    value={formData.name}
                    onChange={(e) => handleInputChange(e)}
                /> */}
                <FormInput
                    label='What do you like to be called? *'
                    name="name" type="text" placeholder="Enter your valid name" />
            </div>

            <div className="flex justify-between ">
                <div className="w-[145px]">
                    <FormSelectedField
                        label="I'm *"
                        name="gender"
                        options={genderOptions}
                        placeholder="Select"
                    />
                </div>
                <div className="w-[145px]">
                    <FormSelectedField
                        label="Seeking for *"
                        name="concern"
                        options={concernOptions}
                        placeholder="Select Concern"
                    />
                </div>
            </div>
            <div className="w-[145px]">
                <FormDatePicker
                    label='Date of birth *'
                    name='date'
                    defaultValue={new Date("1990-01-01")}
                />
                <p className="text-[#FF8A00] text-[8px] ">Who knows maybe a surprise waiting for you...</p>
            </div>
            <div className="mt-[24px] flex">

                <Button onClick={handleNext} className="mx-auto bg-black w-[67px] h-[25px] py-1 px-[18px]" >Next</Button>
            </div>
        </div>
    )
}
