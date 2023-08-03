import React, { useState } from 'react'
import ImageStack from './ImageStack'
import LoadingButton from '../loading/LoadingButton'
import axiosConfig from '../../api/axios.config';
import { useNavigate } from 'react-router-dom';

const BodySection = () => {

    const [loading, setLoading] = useState(false);

    // Navigate to different routes
    const navigate = useNavigate();

    // Redirect tp uploading page
    const uploadImage = () => {
        setLoading(true); // Activate loading
        axiosConfig.get('/user/verify').then((res) => {
            setLoading(false); // Deactivate loading
            navigate('/dashboard')
        }).catch(() => {
            setLoading(false); // Deactivate loading
            navigate('/login');
        })
    }

    return (
        <div className='bg-violet-100 w-full pt-20 h-screen md:hidden'>
            <div className='md:hidden'>
                <ImageStack />
            </div>
            <div className='mx-auto p-7 text-center'>
                <h1 className='text-2xl font-bold font-poppins'>Seamlessly Upload and Manage Your Extensive Photo Collection</h1>
                <p className='font-montserrat text-sm font-normal mt-3 mb-4'>Upload, organize, and effortlessly share your photos. Store and manage your memories without restrictions, while easily sharing them with loved ones. Simplify your photo journey with CloudPix</p>
                <LoadingButton value="Upload" loading={loading} onClickFunction={uploadImage} />
            </div>
        </div>
    )
}

export default BodySection