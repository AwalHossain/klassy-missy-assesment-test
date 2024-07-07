/* eslint-disable react/no-unescaped-entities */
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FormStepOne from "../forms/FormStepOne";
import { Button } from "../ui/button";
import CharacterImage from "../ui/characterImage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const SkinRegimenForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        concern: '',
        dateOfBirth: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const methods = useForm();

    const { handleSubmit, reset } = methods;

    const handleStudentOnSubmit = (data: any) => {
        console.log(data, 'data');

        // submitHandler(data);
        // reset();
        // setToLocalStorage("step", JSON.stringify({ step: 0 }));
        // navigateLink && router.push(navigateLink);
    };

    // console.log(steps[current], 'cehei')

    return (
        <div >
            {/* <h1 className="text-2xl font-bold mb-6">Build Your Regimen</h1> */}
            <FormProvider {...methods}>

                <form onSubmit={handleSubmit(handleStudentOnSubmit)}>

                    {step === 1 && (
                        <FormStepOne
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleNext={handleNext}
                        />
                    )}

                    {
                        step === 2 && (
                            <>
                                <CharacterImage />
                                <label className="block text-sm font-medium text-gray-700 mb-1">What's your concern? *</label>
                                {/* <Select
                        options={[
                            { value: '', label: 'Select your concern or search by keyword' },
                        ]}
                        value=""
                        onChange={() => { }}
                    /> */}
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                                        Hyperpigmentation <button className="ml-1">&times;</button>
                                    </span>
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                                        Dehydrated skin <button className="ml-1">&times;</button>
                                    </span>
                                </div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Do you have any other concerns?</label>
                                {/* <Select
                        options={[
                            { value: '', label: 'Select eye area concerns' },
                        ]}
                        value=""
                        onChange={() => { }}
                    /> */}
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">What's your concern? *</label>
                                    <textarea
                                        placeholder="Please write details about your skin concerns and mention A to Z skin problems"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        rows={4}
                                    ></textarea>
                                </div>

                                <div className="flex justify-between">
                                    <Button variant="secondary" onClick={handleBack}>
                                        <ChevronLeft className="inline mr-1" /> Back
                                    </Button>
                                    <Button type="submit">Submit</Button>
                                </div>
                            </>
                        )
                    }
                </form>
            </FormProvider>
        </div >
    );
};

export default SkinRegimenForm;