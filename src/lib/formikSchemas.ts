import * as Yup from 'yup';

const formikSchema = Yup.object().shape({
    username: Yup.string().min(3,"At least 3char needed").required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'At least 6 char needed').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref("password")],"Password must match").required('Confirm Password is required')
})

export default formikSchema;