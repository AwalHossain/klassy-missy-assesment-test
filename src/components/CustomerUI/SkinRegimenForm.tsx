/* eslint-disable react/no-unescaped-entities */
"use client";

import { FormDataSchema } from "@/lib/formSchema";
import { setFormData } from "@/redux/formSlice";
import { useAppDispatch } from "@/redux/hooks";
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from "framer-motion";
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormDatePicker from "../forms/FormDatePicker";
import FormInput from "../forms/FormInput";
import FormMultipleSelectionField from "../forms/FormMultipleSelectionField";
import FormSelectedField from "../forms/FormSelectedField";
import FormTextArea from "../forms/FormTextArea";
import { concernOptions, genderOptions } from "../steps/FormStepOne";
import FormStepThree from "../steps/FormStepThree";
import { Button } from "../ui/button";
import CharacterImage from "../ui/characterImage";

type Inputs = z.infer<typeof FormDataSchema>

const steps = [
    {
        id: 'Step 1',
        name: 'Personal Information',
        fields: ['name', 'gender', 'concern', 'DOB']
    },
    {
        id: 'Step 2',
        name: 'Concerns',
        fields: ['concernName', 'eyeConcern', 'writtenConcern']
    },
    { id: 'Step 3', name: 'Complete' }
]

const SkinRegimenForm = () => {
    const [previousStep, setPreviousStep] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const delta = currentStep - previousStep;
    const methods = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema),
        defaultValues: async () => {
            const savedValues = localStorage.getItem("formValues");
            if (savedValues) {
                const parsedValues = JSON.parse(savedValues);
                // Check if DOB exists and is a string, then convert it to a Date object
                if (parsedValues.DOB && typeof parsedValues.DOB === 'string') {
                    parsedValues.DOB = new Date(parsedValues.DOB);
                }
                dispatch(setFormData(parsedValues));
                return parsedValues;
            }
            return {};
        }
    });

    const dispatch = useAppDispatch();
    // const formData = useAppSelector(state => state.form);

    const { handleSubmit, reset, trigger, getValues, setValue, watch } = methods;

    // Load initial data from localStorage
    useEffect(() => {
        const savedStep = localStorage.getItem("currentStep");
        if (savedStep) {
            setCurrentStep(parseInt(savedStep, 10));
        }
    }, []);

    // Save to localStorage when form data changes
    const saveFormData = useCallback(debounce(() => {
        const formData = getValues();
        localStorage.setItem("formValues", JSON.stringify(formData));
        dispatch(setFormData(formData));
    }, 500), [getValues]);


    // // Update Redux state when form fields change
    // const handleFieldChange = (field: keyof Inputs, value: any) => {
    //     dispatch(updateField({ field, value }));
    // };



    useEffect(() => {
        const subscription = watch(() => {
            saveFormData();
        });
        return () => subscription.unsubscribe();
    }, [watch, saveFormData]);

    const processForm: SubmitHandler<Inputs> = data => {
        console.log(data);
        localStorage.removeItem("formValues");
        localStorage.removeItem("currentStep");
        reset();
    };

    type FieldName = keyof Inputs;

    const next = async () => {
        const fields = steps[currentStep].fields;
        const output = await trigger(fields as FieldName[], { shouldFocus: true });

        if (!output) return;

        if (currentStep < steps.length - 1) {
            saveFormData.flush();
            localStorage.setItem("currentStep", (currentStep + 1).toString());
            if (currentStep === steps.length - 2) {
                await handleSubmit(processForm)();
            }
            setPreviousStep(currentStep);
            setCurrentStep(step => step + 1);
        }
    };

    const prev = () => {
        if (currentStep > 0) {
            saveFormData();
            setPreviousStep(currentStep);
            setCurrentStep(step => step - 1);
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <section className='flex flex-col justify-between mb-8'>
                <nav aria-label="Progress">
                    <ol role="list" className="flex space-y-4 md:space-x-8 md:space-y-0">
                        {
                            steps.map((step, index) => (
                                <li key={step.name} className="md:flex-1">
                                    {
                                        currentStep > index ? (
                                            <div className='group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                                <span className='text-sm font-medium text-sky-600 transition-colors '>
                                                    {step.id}
                                                </span>
                                                <span className='text-sm font-medium'>{step.name}</span>
                                            </div>
                                        ) : currentStep === index ? (
                                            <div
                                                className='flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'
                                                aria-current='step'
                                            >
                                                <span className='text-sm font-medium text-sky-600'>
                                                    {step.id}
                                                </span>
                                                <span className='text-sm font-medium'>{step.name}</span>
                                            </div>
                                        ) : (
                                            <div className='group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4'>
                                                <span className='text-sm font-medium text-gray-500 transition-colors'>
                                                    {step.id}
                                                </span>
                                                <span className='text-sm font-medium'>{step.name}</span>
                                            </div>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ol>
                </nav>

            </section>
            <section className="">

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(processForm)} >
                        {currentStep === 0 && (
                            <motion.div
                                initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <div className="space-y-[18px]">
                                    <div className="mb-6">
                                        <h2 className="text-[15px] font-semibold text-center">Let's get started!</h2>
                                        <p className="text-center text-[10px]">
                                            It'll take 2-3 minutes to understand you
                                            and your skin concern.
                                        </p>
                                    </div>
                                    <CharacterImage ImageUrl="/images/girl.png" />
                                    <div className="sm:max-w-md">
                                        <FormInput
                                            label='What do you like to be called? *'
                                            name="name"
                                            type="text"
                                            placeholder="Enter your valid name"
                                        />
                                    </div>
                                    <div className="flex justify-between space-x-2">
                                        <div className="w-[145px] sm:w-1/2">
                                            <FormSelectedField
                                                label="I'm *"
                                                name="gender"
                                                options={genderOptions}
                                                placeholder="Select"
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
                                        <p className="text-[#FF8A00] text-[8px]">Who knows maybe a surprise waiting for you...</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 1 && (
                            <motion.div
                                initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <div className="space-y-[18px]">
                                    <CharacterImage ImageUrl="/images/confused.svg" />
                                    <div>
                                        <FormMultipleSelectionField
                                            label="What's your concern? *"
                                            name="concernName"
                                            placeholder="Select your concern or search by keyword"
                                            options={concernOptions}
                                        />
                                    </div>


                                    <div className="flex justify-between items-center">
                                        <FormSelectedField
                                            label={`Do you have any eye area concern, ${watch('name')}?`}
                                            name="eyeConcern"
                                            options={concernOptions}
                                            className="max-w-md"
                                            imageSrc="/images/light.png"
                                        />
                                    </div>


                                    <div className="mb-4">
                                        <FormTextArea
                                            label="What's your concern? *"
                                            name="writtenConcern"
                                            placeholder="Please write details about your skin concerns and mention A to Z skin problem’s"
                                            className="text-[13px]"
                                        />
                                    </div>

                                    {/* <div className="flex justify-between">
                                <Button variant="secondary" onClick={handleBack}>
                                    <ChevronLeft className="inline mr-1" /> Back
                                </Button>
                                <Button type="submit">Submit</Button>
                            </div> */}
                                </div>
                            </motion.div>
                        )}
                        {
                            currentStep === 2 && (
                                <FormStepThree />
                            )
                        }
                    </form>
                </FormProvider>
                <div className="mt-[24px] flex">
                    <Button
                        type='button'
                        onClick={prev}
                        disabled={currentStep === 0}
                        className="mx-auto bg-black w-[67px] h-[25px] py-1 px-[18px]">
                        Prev
                    </Button>
                    <Button
                        type='button'
                        onClick={next}
                        disabled={currentStep === steps.length - 1}
                        className="mx-auto bg-black w-[67px] h-[25px] py-1 px-[18px]">
                        Next
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default SkinRegimenForm;