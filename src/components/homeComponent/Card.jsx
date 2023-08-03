import React, { useRef, useState } from 'react'
import axiosConfig from '../../api/axios.config'
import LoadingButton from '../loading/LoadingButton'
import { useNavigate } from 'react-router-dom'

const Card = () => {

    const [loading, setLoading] = useState(false);

    // Navigate to different routes
    const navigate = useNavigate();

    // Redirect tp uploading page
    const uploadImage = () => {
        setLoading(true); // Activate loading
        axiosConfig.get('/user/verify', { withCredentials: true }).then((res) => {
            setLoading(false); // Deactivate loading
            navigate('/dashboard')
        }).catch((err) => {
            setLoading(false); // Deactivate loading
            navigate("/login")
        })
    }

    return (
        <div className='bg-white rounded-xl p-5 w-[80%] sm:w-[50%] md:w-[30%] mx-auto text-center md:m-0'>
            <h1 className='text-3xl font-extrabold font-poppins mb-5'>Preserve and Share Your Moments</h1>
            <p className='text-sm font-montserrat mb-5'>CloudPix - Your All-in-One Photo Storage, Management, and Sharing Platform</p>
            <LoadingButton value="Upload now" loading={loading} onClickFunction={uploadImage} />
        </div>
    )
}

export default Card
