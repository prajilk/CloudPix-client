import React, { useEffect, useState, useContext } from 'react'
import Header from "../components/homeComponent/Header";
import UploadCard from '../components/DashboardComponent/UploadCard';
import ShowFiles from '../components/DashboardComponent/ShowFiles';
import axiosConfig from '../api/axios.config';
import { useNavigate } from 'react-router-dom';
import { ProfileModalContext, UploadsContext } from "../context/uploadsContext"
import ProfileSettingsModal from '../components/DashboardComponent/Modal/ProfileSettingsModal';

const Dashboard = () => {

    const [uploads, setUploads] = useState([]);// state to store all images of user uploads
    const [user, setUser] = useState();

    const [profileModal, setProfileModal] = useState(false);// state to handle profile settings modal

    // Validate user state to verifying user
    const [validate, setValidate] = useState(false);

    const navigate = useNavigate(); // Initialize navigate to go to other pages

    // Axios request for validate user identity.
    useEffect(() => {
        axiosConfig.get('/user/verify').then(({ data }) => {
            // Validated user
            setValidate(true);
            setUser(data.user)
        }).catch(() => {
            navigate('/login')
        })
    }, [navigate]);

    return (
        <>
            {validate &&
                <UploadsContext.Provider value={{ uploads, setUploads }}>
                    <ProfileModalContext.Provider value={{ profileModal, setProfileModal }} >
                        <div className='bg-violet-100 h-screen'>
                            <Header position="relative" />
                            <div className='md:flex h-[calc(100%_-_10rem)] md:h-[calc(100%_-_5.2rem)]'>
                                <div className='p-5 md:p-10'>
                                    <UploadCard />
                                </div>
                                <div className='flex-1 h-full p-3'>
                                    <ShowFiles />
                                </div>
                            </div>
                        </div>
                        <ProfileSettingsModal user={user} setUser={setUser} />
                    </ProfileModalContext.Provider>
                </UploadsContext.Provider>}
        </>
    )
}

export default Dashboard
