import React, { useEffect } from 'react';
import { FormProvider, SubmitErrorHandler, useForm } from 'react-hook-form';

type FormConfig = {
    defaultValues?: Record<string, any>;
    resolver?: any;

}

type FormProps = {
    children: React.ReactNode;
    submitHandler: SubmitErrorHandler<any>;
} & FormConfig;

const Form = ({ children, submitHandler, defaultValues, resolver }: FormProps) => {
    const FormConfig: FormConfig = {};

    if (!!defaultValues) FormConfig['defaultValues'] = defaultValues;
    if (!!resolver) FormConfig['resolver'] = resolver;

    const methods = useForm<FormProps>(FormConfig)

    const { handleSubmit, reset } = methods;
    const onSubmit = (data: any) => {
        submitHandler(data);

    }

    useEffect(() => {
        reset(defaultValues)
    }, [reset, defaultValues])


    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} >
                {children}
            </form>
        </FormProvider>
    )
}

export default Form;
