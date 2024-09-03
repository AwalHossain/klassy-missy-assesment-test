'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import formikSchema from "@/lib/formikSchemas";
import { useFormik } from "formik";

// form value interface
interface FormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function FormikForm() {
    const handleSubmit = (values: FormValues) => {
        console.log(values);
    };

    const { values, errors, handleChange, handleBlur, handleSubmit: formikSubmit, touched } = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        onSubmit: handleSubmit,
        validationSchema: formikSchema
    });

    console.log('formik values', values, 'formik errors', errors);

    return (
        <div className="max-w-[550px] mx-auto">
            <form onSubmit={formikSubmit}>
                <div className="mb-4">
                    <label htmlFor="username">Write your username</label>
                    <Input
                        type="text"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.username && touched.username && <span className="text-red-500">{errors.username}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email">Write your email</label>
                    <Input
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.email && touched.email && <span className="text-red-500">{errors.email}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password">Password</label>
                    <Input
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.password && touched.password && <span className="text-red-500">{errors.password}</span>}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.confirmPassword && touched.confirmPassword && <span className="text-red-500">{errors.confirmPassword}</span>}
                </div>
                <Button type="submit" className="my-2">Submit</Button>
            </form>
        </div>
    );
}