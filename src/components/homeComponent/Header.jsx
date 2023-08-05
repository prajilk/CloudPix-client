import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Bars, User } from '../../assets/SVGs';
import { ProfileModalContext } from '../../context/uploadsContext';

const Header = ({ position }) => {

    const [isDashboard, setIsDashboard] = useState(true)

    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/') {
            setIsDashboard(false)
        }
    }, [])

    const ProfileModal = useContext(ProfileModalContext);

    const [toggleNav, setToggleNav] = useState('-translate-x-full'); // Hide side nab bar

    const navigate = useNavigate(); // Initialize useNavigate for routing

    return (
        <nav className={`w-full p-3 md:p-5 md:pr-0 flex justify-between ${position}`}>
            <div>
                <h2 onClick={() => navigate('/')} className="bg-violet-500 md:text-xl cursor-pointer font-montserrat font-normal px-2 py-1 text-white inline-block rounded-ss-xl rounded-ee-xl shadow-xl">CloudPix</h2>
            </div>
            <div>
                {isDashboard && <button type="button" onClick={() => ProfileModal.setProfileModal(true)} className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-violet-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 hover:text-white">
                    <User />
                </button>}
                <button type="button" onClick={() => setToggleNav('translate-x-0')} className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-violet-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 hover:bg-violet-500 hover:text-white">
                    <Bars />
                </button>

                {/* Nav in Small device */}
                <div onClick={() => setToggleNav('-translate-x-full')} className={`md:hidden duration-75 ${toggleNav} transition bg-slate-400 bg-opacity-50 w-full h-screen z-50 top-0 left-0 bottom-0 fixed`}>
                    <ul className='bg-white min-h-screen min-w-[70%] float-left p-5'>
                        <h2 onClick={() => navigate('/')} className=" bg-violet-500 text-xs font-montserrat font-normal px-2 py-1 text-white inline-block rounded-ss-xl rounded-ee-xl mb-5">CloudPix</h2>
                        <li onClick={() => navigate('/dashboard')} className='p-3 border-b-2 border-slate-100 font-montserrat font-bold hover:bg-slate-100'>My Storage</li>
                        <li onClick={() => navigate('/')} className='p-3 border-b-2 border-slate-100 font-montserrat font-bold hover:bg-slate-100'>Home</li>
                        <li className='p-3 border-b-2 border-slate-100 font-montserrat font-bold hover:bg-slate-100'>About Us</li>
                        <li className='p-3 border-b-2 border-slate-100 font-montserrat font-bold hover:bg-slate-100'>Contact Us</li>
                        <li onClick={() => navigate('/register')} className='p-3 border-b-2 border-slate-100 font-montserrat font-bold hover:bg-slate-100'>Sign Up</li>
                        <li onClick={() => navigate('/login')} className='p-3 border-b-2 border-slate-100 font-montserrat font-bold hover:bg-slate-100'>Login</li>
                    </ul>
                </div>

                {/* Nav in Large device */}
                <ul className='hidden rounded-s-full md:flex text-xs font-montserrat font-semibold shadow-md border-slate-100 border-2'>
                    <li onClick={() => navigate('/dashboard')} className='cursor-pointer bg-white rounded-s-full px-7 py-3 border-r-2 border-slate-100 hover:bg-slate-100'>My Storage</li>
                    <li onClick={() => navigate('/')} className='cursor-pointer bg-white px-5 py-3 border-r-2 border-slate-100 hover:bg-slate-100'>Home</li>
                    <li className='cursor-pointer bg-white px-5 py-3 border-r-2 border-slate-100 hover:bg-slate-100'>About Us</li>
                    <li className='cursor-pointer bg-white px-5 py-3 border-r-2 border-slate-100 hover:bg-slate-100'>Contact Us</li>
                    <li onClick={() => navigate('/register')} className='cursor-pointer bg-white px-5 py-3 border-r-2 border-slate-100 hover:bg-slate-100'>Sign Up</li>
                    <li onClick={() => navigate('/login')} className='cursor-pointer bg-white px-5 py-3 hover:bg-slate-100'>Log In</li>
                </ul>
            </div>
        </nav>
    )
}

export default Header
