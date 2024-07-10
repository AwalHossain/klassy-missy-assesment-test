'use client'

import { FormDataSchema } from "@/lib/formSchema";
import { setCurrentStep, setFormData } from "@/redux/formSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addCard } from "@/redux/kanbanSlice";
import { removeFromLocalStorage } from "@/utils/localstorage";
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { STEPS } from "../data/FormData";
import FormStepOne from "../steps/FormStepOne";
import FormStepThree from "../steps/FormStepThree";
import FormStepTwo from "../steps/FormStepTwo";
import Stepper from "../steps/Stepper";
import { Button } from "../ui/button";

type Inputs = z.infer<typeof FormDataSchema>

const SkinRegimenForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { currentStep, ...formData } = useAppSelector((state) => state.form);

    const delta = currentStep - (useMemo(() => STEPS.length - 1, []));

    const methods = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema),
        defaultValues: useMemo(() => {
            // change date value from string to date object
            const { DOB, ...rest } = formData;
            if (DOB) {
                return { ...rest, DOB: new Date(DOB) };
            }
            return formData;
        }, [formData])
    });

    const { handleSubmit, reset, trigger, getValues } = methods;

    const persistFormData = useCallback((data: Inputs) => {
        dispatch(setFormData(data));
    }, [dispatch]);

    const clearForm = useCallback(() => {
        dispatch(setFormData({}));
        dispatch(setCurrentStep(0));
        removeFromLocalStorage('skinRegimenForm');
    }, [dispatch]);


    const processForm: SubmitHandler<Inputs> = useCallback((data) => {
        console.log(data);
        const newCard = {
            id: Date.now().toString(),
            regimen: `RGM-${Date.now().toString()}`,
            datetime: new Date().toLocaleString(),
            ...data,
        };
        dispatch(addCard({ columnId: 'incoming', card: newCard }));
        setTimeout(() => {
            router.push('/dashboard');
        }, 50);
        clearForm()
    }, [dispatch, router, clearForm]);

    const next = async () => {
        const fields = STEPS[currentStep].fields;
        const output = await trigger(fields as Array<keyof Inputs>, { shouldFocus: true });

        if (!output) return;

        if (currentStep < STEPS.length - 1) {
            persistFormData(getValues());
            dispatch(setCurrentStep(currentStep + 1));
        }
    };

    const prev = () => {
        if (currentStep > 0) {
            dispatch(setCurrentStep(currentStep - 1));
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
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