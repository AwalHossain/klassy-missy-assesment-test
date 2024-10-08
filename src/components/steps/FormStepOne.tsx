'use client';

/* eslint-disable react/no-unescaped-entities */
import { useFormContext } from 'react-hook-form';
import { concernOptions } from '../data/FormData';
import FormDatePicker from "../forms/FormDatePicker";
import FormInput from "../forms/FormInput";
import FormSelectedField from "../forms/FormSelectedField";
import CharacterImage from "../ui/characterImage";

const FormStepOne = () => {
    const { watch } = useFormContext();

    return (
        <div className="space-y-[18px]">
            <div className="mb-6">
                <h2 className="text-[15px] md:text-[18px] font-semibold text-center">Let's get started!</h2>
                <p className="text-center text-[10px] md:text-[14px]">
                    It'll take 2-3 minutes to understand you and your skin concern.
                </p>
            </div>
            <CharacterImage ImageUrl="/images/girl.svg" />
            <div className="sm:max-w-md">
                <FormInput
                    label='What do you like to be called? *'
                    name="fullName"
                    type="text"
                    placeholder="Enter your valid name"
                />
            </div>
            <div className="flex justify-between space-x-2">
                <div className="w-[145px] sm:w-1/2">
                    <FormInput
                        label="Enter your password *"
                        name="password"
                        placeholder="anypass124"
                    />
                </div>
                <div className="w-[145px] sm:w-1/2">
                    <FormSelectedField
                        label="Seeking for *"
                        name="concern"
                        options={concernOptions}
                        placeholder="Select Concern"
                    />
                </div>
            </div>
            <div className="w-[145px] sm:w-1/2">
                <FormDatePicker
                    label='Date of birth *'
                    name='DOB'
                />
                <p className="text-[#FF8A00] text-[10px]">Who knows maybe a surprise waiting for you...</p>
            </div>
        </div>
    );
};

export default FormStepOne;