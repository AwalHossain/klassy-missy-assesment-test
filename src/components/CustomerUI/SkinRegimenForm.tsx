/* eslint-disable react/no-unescaped-entities */
"use client";

import { FormDataSchema } from "@/lib/formSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import FormDatePicker from "../forms/FormDatePicker";
import FormInput from "../forms/FormInput";
import FormMultipleSelectionField from "../forms/FormMultipleSelectionField";
import FormSelectedField from "../forms/FormSelectedField";
import { concernOptions, genderOptions } from "../forms/FormStepOne";
import FormTextArea from "../forms/FormTextArea";
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
                return parsedValues;
            }
            return {};
        }
    });

    const { handleSubmit, reset, trigger, getValues, setValue, watch } = methods;

    useEffect(() => {
        const savedStep = localStorage.getItem("currentStep");
        if (savedStep) {
            setCurrentStep(parseInt(savedStep, 10));
        }
    }, []);

    const saveFormData = useCallback(debounce(() => {
        const formData = getValues();
        localStorage.setItem("formValues", JSON.stringify(formData));
    }, 500), [getValues]);

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
        <div>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(processForm)}>
                    {currentStep === 0 && (
                        <div className="space-y-[18px]">
                            <div className="mb-6">
                                <h2 className="text-[15px] font-semibold text-center">Let's get started!</h2>
                                <p className="text-center text-[10px]">
                                    It'll take 2-3 minutes to understand you
                                    and your skin concern.
                                </p>
                            </div>
                            <CharacterImage ImageUrl="/images/girl.png" />
                            <div>
                                <FormInput
                                    label='What do you like to be called? *'
                                    name="name"
                                    type="text"
                                    placeholder="Enter your valid name" />
                            </div>
                            <div className="flex justify-between">
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
                                    name='DOB'
                                />
                                <p className="text-[#FF8A00] text-[8px]">Who knows maybe a surprise waiting for you...</p>
                            </div>
                        </div>
                    )}

                    {currentStep === 1 && (
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
                    )}
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
        </div>
    );
};

export default SkinRegimenForm;