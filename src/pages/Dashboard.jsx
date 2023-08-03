import React, { useEffect, useState } from 'react'
import Header from "../components/homeComponent/Header";
import UploadCard from '../components/DashboardComponent.jsx/UploadCard';
import ShowFiles from '../components/DashboardComponent.jsx/ShowFiles';
import axiosConfig from '../api/axios.config';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [validate, setValidate] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axiosConfig.get('/user/verify').then(({ data }) => {
            // Validated user
            setValidate(true);
        }).catch(() => {
            navigate('/login')
        })
    }, [navigate]);

    return (
        <>
            {validate && <div className='bg-violet-100 h-screen'>
                <Header position="relative" />
                <div className='md:flex h-[calc(100%_-_10rem)] md:h-[calc(100%_-_5.2rem)]'>
                    <div className='p-5 md:p-10'>
                        <UploadCard />
                    </div>
                    <div className='flex-1 h-full p-3'>
                        <ShowFiles />
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Dashboard
