import React from 'react'
import FormTemplate from '../components/formComponents/FormTemplate';
import RegisterForm from '../components/formComponents/RegisterForm';

const Register = () => {

    const registerPageDetails = {
        heading: "Create CloudPix account.",
        footer: {
            para: "Have an account?",
            linkText: "Log in",
            link: '/login'
        }
    }

    return (
        <FormTemplate Form={RegisterForm} pageDetails={registerPageDetails} />
    )
}

export default Register
