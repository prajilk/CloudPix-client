import React, { useState } from 'react'
import Input from './Input'
import useFormData from '../../hooks/useFormData';
import SubmitButton from './SubmitButton';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios.config';

const LoginForm = () => {

  // Get all user data useState value from the useFormData function.
  const { email, setEmail, password, setPassword } = useFormData();

  const [error, setError] = useState(false);
  const [responseStatus, setResponseStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const userLogin = (e) => {

    e.preventDefault(); // Prevent browser from refreshing
    setLoading(true); // Activate loading animation on the button
    setError(false); // Hide error text

    // Validate all user inputs
    if (email.trim() !== '' && password.trim() !== '') {
      // API Call for registering a new user
      axios.post('/login', { email, password }).then(() => {
        setLoading(false); // Deactivate loading animation on the button
        navigate('/dashboard'); // Navigate to login route after registration
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
    <form className="mt-7 grid space-y-4" method='post' onSubmit={userLogin}>
      {error && <span className='bg-red-100 text-red-500 px-3 py-2.5 rounded-lg text-center transition-all duration-200'>{responseStatus}</span>}
      <Input type="email" placeholder="Email" state={email} setState={setEmail} />
      <Input type="password" placeholder="Password" state={password} setState={setPassword} />
      <SubmitButton value="Log in" loading={loading} />
    </form>
  )
}

export default LoginForm
