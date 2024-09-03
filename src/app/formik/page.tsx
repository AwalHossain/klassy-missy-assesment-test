'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";

// form value interface
interface FormValues {
    username: string;
    email: string;
}

export default function FormikForm() {
    const handFormleSubmit = (values: FormValues) => {
        console.log(values)
    }
    const { values, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: {
            username: '',
            email: ''
        },
        onSubmit: handFormleSubmit,
    })

    console.log('formik vales', values);


    return (
        // <Formik>

        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Write your username</label>
            <Input type="text" name="username" value={values.username} onChange={handleChange} />
            <label htmlFor="email">Write your email</label>
            <Input type="email" name="email" value={values.email} onChange={handleChange} />
            <Button type="submit">Submit</Button>
        </form>
        // </Formik>
    )
}
