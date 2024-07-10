'use client'

import { FormDataSchema } from "@/lib/formSchema";
import { setFormData, setCurrentStep as setReduxCurrentStep } from "@/redux/formSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addCard } from "@/redux/kanbanSlice";
import { removeFromLocalStorage } from "@/utils/localstorage";
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { STEPS } from "../data/FormData";
import FormStepOne from "../steps/FormStepOne";
import FormStepTwo from "../steps/FormStepTwo";
import Stepper from "../steps/Stepper";
import { Button } from "../ui/button";

type Inputs = z.infer<typeof FormDataSchema>

const SkinRegimenForm = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { currentStep: reduxStep, ...formData } = useAppSelector((state) => state.form);
    const [localStep, setLocalStep] = useState(reduxStep);

    useEffect(() => {
        setLocalStep(reduxStep);
    }, [reduxStep]);

    const methods = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema),
        defaultValues: useMemo(() => {
            const { DOB, ...rest } = formData;
            return DOB ? { ...rest, DOB: new Date(DOB) } : formData;
        }, [formData])
    });

    const { handleSubmit, trigger, getValues } = methods;

    const persistFormData = useCallback((data: Inputs) => {
        dispatch(setFormData(data));
    }, [dispatch]);

    const clearForm = useCallback(() => {
        dispatch(setFormData({}));
        dispatch(setReduxCurrentStep(0));
        setLocalStep(0);
        removeFromLocalStorage('skinRegimenForm');
    }, [dispatch]);

    const processForm = useCallback((data: Inputs) => {
        const newCard = {
            id: Date.now().toString(),
            regimen: `RGM-${Date.now().toString()}`,
            datetime: new Date().toLocaleString(),
            ...data,
        };
        dispatch(addCard({ columnId: 'incoming', card: newCard }));
        router.push('/dashboard');
        clearForm();
    }, [dispatch, router, clearForm]);

    const next = async () => {
        const fields = STEPS[localStep].fields;
        const isValid = await trigger(fields as Array<keyof Inputs>, { shouldFocus: true });

        if (isValid && localStep < STEPS.length - 1) {
            persistFormData(getValues());
            setLocalStep(prev => prev + 1);
            dispatch(setReduxCurrentStep(localStep + 1));
        }
    };

    const prev = () => {
        if (localStep > 0) {
            setLocalStep(prev => prev - 1);
            dispatch(setReduxCurrentStep(localStep - 1));
        }
    };

    const renderStep = () => {
        switch (localStep) {
            case 0: return <FormStepOne />;
            case 1: return <FormStepTwo />;
            default: return null;
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Stepper steps={STEPS} currentStep={localStep} />
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(processForm)}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={localStep}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                    <div className="mt-6 flex justify-between">
                        <Button
                            type="button"
                            onClick={prev}
                            disabled={localStep === 0}
                            className="bg-black w-24 h-10"
                        >
                            Prev
                        </Button>
                        {localStep < STEPS.length - 1 ? (
                            <Button
                                type="button"
                                onClick={next}
                                className="bg-black w-24 h-10"
                            >
                                Next
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="bg-black w-24 h-10"
                            >
                                Submit
                            </Button>
                        )}
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default SkinRegimenForm;