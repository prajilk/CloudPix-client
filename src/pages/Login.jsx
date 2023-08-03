import React from 'react'
import FormTemplate from '../components/formComponents/FormTemplate';
import LoginForm from '../components/formComponents/LoginForm';

const Login = () => {

    const loginPageDetails = {
        heading: "Log in with CloudPix.",
        footer: {
            para: "Don't have an account?",
            linkText: "Create now",
            link: '/register'
        }
    }

    return (

        <FormTemplate Form={LoginForm} pageDetails={loginPageDetails} />

    )
}

export default Login
