import { useState } from 'react';

const useFormData = () => {
    const [email, setEmail] = useState(''); // State for email
    const [fullName, setFullName] = useState(''); // State for first name.
    const [password, setPassword] = useState(''); // State for password.

    return {
        fullName,
        setFullName,
        email,
        setEmail,
        password,
        setPassword
    };
};

export default useFormData;
