import React, { useState } from 'react'
import useFormData from '../../hooks/useFormData';
import Input from './Input';
import SubmitButton from './SubmitButton';
import axios from '../../api/axios.config';
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {

    const { email, setEmail, fullName, setFullName, password, setPassword } = useFormData();

    const [error, setError] = useState(false);
    const [responseStatus, setResponseStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const userRegister = (e) => {

        e.preventDefault(); // Prevent browser from refreshing
        setLoading(true); // Activate loading animation on the button
        setError(false); // Hide error text

        // Validate all user inputs
        if (email.trim() !== '' && fullName.trim() !== '' && password.trim() !== '') {
            // API Call for registering a new user
            axios.post('/register', { email, password, fullName }).then(() => {
                setLoading(false); // Deactivate loading animation on the button
                navigate('/login'); // Navigate to login route after registration
            }).catch((err) => {
                if (err.response.data.error) {
                    // Display whats error
                    setResponseStatus(err.response.data.message);
                } else {
                    setResponseStatus('Something went wrong!');
                }
                setLoading(false); // Deactivate loading animation on the button
                setError(true); // Show error text
            })
        }
    }

    return (
        <form className="mt-5 grid space-y-4" method='post' onSubmit={userRegister}>
            {error && <span className='bg-red-100 text-red-500 px-3 py-2.5 rounded-lg text-center transition-all duration-200'>{responseStatus}</span>}
            <Input type="email" placeholder="Email" state={email} setState={setEmail} />
            <Input type="text" placeholder="Full name" state={fullName} setState={setFullName} />
            <Input type="password" placeholder="Password" state={password} setState={setPassword} />
            <SubmitButton value="Create account" loading={loading} />
        </form>
    )
}

export default RegisterForm
