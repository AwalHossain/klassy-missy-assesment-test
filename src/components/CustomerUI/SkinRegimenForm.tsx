'use client'

import { FormDataSchema } from "@/lib/formSchema";
import { setFormData } from "@/redux/formSlice";
import { useAppDispatch } from "@/redux/hooks";
import { addCard } from "@/redux/kanbanSlice";
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/utils/localstorage";
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from "framer-motion";
import debounce from 'lodash/debounce';
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { STEPS } from "../data/FormData";
import FormStepOne from "../steps/FormStepOne";
import FormStepThree from "../steps/FormStepThree";
import FormStepTwo from "../steps/FormStepTwo";
import Stepper from "../steps/Stepper";
import { Button } from "../ui/button";

type Inputs = z.infer<typeof FormDataSchema>



const FORM_STORAGE_KEY = 'skinRegimenForm';

const SkinRegimenForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();


    const [currentStep, setCurrentStep] = useState(() => {
        const savedStep = getFromLocalStorage(`${FORM_STORAGE_KEY}_step`);
        return savedStep ? parseInt(savedStep, 10) : 0;
    });

    const delta = currentStep - (useMemo(() => STEPS.length - 1, []));

    const methods = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema),
        defaultValues: useMemo(() => {
            const savedValues = getFromLocalStorage(FORM_STORAGE_KEY) || '{}';
            if (savedValues) {
                const parsedValues = JSON.parse(savedValues);
                if (parsedValues.DOB && typeof parsedValues.DOB === 'string') {
                    parsedValues.DOB = new Date(parsedValues.DOB);
                }
                return parsedValues;
            }
            return {};
        }, [])
    });

    const { handleSubmit, reset, trigger, getValues, watch } = methods;

    const persistFormData = useCallback(debounce((data: Inputs) => {
        setToLocalStorage(FORM_STORAGE_KEY, JSON.stringify(data));
        dispatch(setFormData(data));
    }, 500), [dispatch]);

    useEffect(() => {
        const subscription = watch((data) => {
            persistFormData(data as Inputs);
        });
        return () => subscription.unsubscribe();
    }, [watch, persistFormData]);

    useEffect(() => {
        setToLocalStorage(`${FORM_STORAGE_KEY}_step`, currentStep.toString());
    }, [currentStep]);

    const clearFormData = useCallback(() => {
        removeFromLocalStorage(FORM_STORAGE_KEY);
        removeFromLocalStorage(`${FORM_STORAGE_KEY}_step`);
        reset();
        dispatch(setFormData({}));
    }, [reset, dispatch]);

    const processForm: SubmitHandler<Inputs> = useCallback((data) => {
        console.log(data);
        const newCard = {
            id: Date.now().toString(),
            regimen: `RGM-${Date.now().toString()}`,
            datetime: new Date().toLocaleString(),
            name: data.name,
        };
        dispatch(addCard({ columnId: 'incoming', card: newCard }));
        // clearFormData();
        setTimeout(() => {
            router.push('/dashboard');
        }, 100);

        // Additional form submission logic here
    }, [dispatch, router]);

    const next = async () => {
        const fields = STEPS[currentStep].fields;
        const output = await trigger(fields as Array<keyof Inputs>, { shouldFocus: true });

        if (!output) return;

        if (currentStep < STEPS.length - 1) {
            persistFormData.flush();
            // if (currentStep === STEPS.length - 2) {
            //     await handleSubmit(processForm)();

            // }
            setCurrentStep(step => step + 1);
        }
    };

    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep(step => step - 1);
        }
    };
    return (
        <div className="max-w-7xl mx-auto">
            <Stepper steps={STEPS} currentStep={currentStep} />
            <section className="">

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(processForm)} >
                        {currentStep === 0 && (
                            <motion.div
                                initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <FormStepOne />
                            </motion.div>
                        )}

                        {currentStep === 1 && (
                            <motion.div
                                initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <FormStepTwo />
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

                    {currentStep < STEPS.length - 1 ? (
                        <Button
                            type='button'
                            onClick={next}
                            className="mx-auto bg-black w-[67px] h-[25px] py-1 px-[18px]">
                            Next
                        </Button>
                    ) : (
                        <Button
                            type='submit'
                            onClick={handleSubmit(processForm)}
                            className="mx-auto bg-black w-[67px] h-[25px] py-1 px-[18px]">
                            Submit
                        </Button>
                    )}
                </div>
            </section>
        </div>
    );
};

export default SkinRegimenForm;