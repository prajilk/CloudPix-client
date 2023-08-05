import React, { Fragment, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProfileModalContext } from '../../../context/uploadsContext'
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { ArrowRightFromCircle, Pencil } from '../../../assets/SVGs';
import Input from './components/Input';
import Button from './components/Button';
import axiosConfig from '../../../api/axios.config';
import { toast } from 'react-hot-toast';

const ProfileSettingsModal = ({ user, setUser }) => {

    const { profileModal, setProfileModal } = useContext(ProfileModalContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState(user.email); // state for update user email, initialize with current email
    const [fullName, setFullName] = useState(user.fullName); // state for update user name, initialize with current name
    const [oldPassword, setOldPassword] = useState(''); // state for update user old password
    const [newPassword, setNewPassword] = useState(''); // state for update user new password
    const [emailLoading, setEmailLoading] = useState(false); // state for email button loading
    const [fullNameLoading, setFullNameLoading] = useState(false); // state for name button loading
    const [passwordLoading, setPasswordLoading] = useState(false); // state for password button loading


    // Function for update user name
    const updateName = (e) => {

        e.preventDefault(); // Prevent form from refreshing the page
        setFullNameLoading(true); // Activate save name button loading

        // Request for update user name
        axiosConfig.post('/update-profile', { _id: user._id, value: fullName, type: 'fullName' })
            .then(({ data }) => {
                setFullNameLoading(false); // Deactivate save name button loading after server response
                toast.success("Name updated successfully!") // Notify response with toast message
                setUser(prevUser => ({ ...prevUser, fullName: data.user.fullName })) // Update user state
            })
            .catch(() => {
                setFullNameLoading(false); // Deactivate save name button loading after server response
                toast.error("Failed to update name!") // Notify response with toast message
            })
    }

    const updateEmail = (e) => {

        e.preventDefault(); // Prevent form from refreshing the page
        setEmailLoading(true); // Activate save email button loading

        // Request for update user email
        axiosConfig.post('/update-profile', { _id: user._id, value: email, type: 'email' })
            .then(({ data }) => {
                setEmailLoading(false); // Deactivate save email button loading after server response
                toast.success("Email updated successfully!") // Notify response with toast message
                setUser(prevUser => ({ ...prevUser, email: data.user.email })) // Update user state
            })
            .catch(() => {
                setEmailLoading(false); // Deactivate save email button loading after server response
                toast.error("Failed to update email!") // Notify response with toast message
            })
    }

    const changePassword = (e) => {

        e.preventDefault(); // Prevent form from refreshing the page
        setPasswordLoading(true); // Activate save password button loading

        // Request for update user password
        axiosConfig.post('/change-password', { oldPassword, newPassword })
            .then(({ data }) => {
                setPasswordLoading(false); // Deactivate save password button loading after server response
                toast.success(data.message) // Notify response with toast message
                setOldPassword('') // Set password field to blank
                setNewPassword('') // Set password field to blank
            })
            .catch(({ response }) => {
                setPasswordLoading(false); // Deactivate save password button loading after server response
                toast.error(response.data.message) // Notify response with toast message
            })
    }

    // Function to logout the user
    const logout = () => {
        axiosConfig.get('/logout')
            .then(() => {
                toast.success("Successfully logout!"); // Notify response with toast message
                navigate('/')
            })
            .catch(() => {
                toast.success("Something went wrong!"); // Notify response with toast message
            })
    }

    return (
        <>
            <Transition appear show={profileModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setProfileModal(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center p-4 justify-center text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform pb-3 overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title as="div" className='px-5 pt-4 pb-1'>
                                        <p className='text-xl font-montserrat font-bold'>Profile</p>
                                    </Dialog.Title>

                                    {/* Update email field */}
                                    <Disclosure>
                                        <div className='flex justify-between px-5 py-2 pe-0'>
                                            <p className="my-1 text-sm leading-relaxed font-montserrat truncate flex-1 flex items-center gap-2">
                                                <span className='font-bold'>Email: </span>
                                                <span>{user.email}</span>
                                            </p>
                                            <Disclosure.Button className="px-5 py-2 flex items-center outline-none">
                                                <Pencil />
                                            </Disclosure.Button>
                                        </div>
                                        <Disclosure.Panel className="bg-gray-200 px-5 py-2">
                                            <form onSubmit={updateEmail} className='flex justify-between gap-2 items-center'>
                                                <Input type='email' value={email} setValue={setEmail} placeholder="Email" />
                                                <Button loading={emailLoading} oldValue={user.email} value={email} />
                                            </form>
                                        </Disclosure.Panel>
                                    </Disclosure>

                                    {/* Update full name field */}
                                    <Disclosure>
                                        <div className='flex justify-between px-5 py-2 pe-0'>
                                            <p className="my-1 text-sm leading-relaxed font-montserrat truncate flex-1 flex items-center gap-2">
                                                <span className='font-bold'>Fullname: </span>
                                                <span>{user.fullName}</span>
                                            </p>
                                            <Disclosure.Button className="px-5 py-2 flex items-center outline-none">
                                                <Pencil />
                                            </Disclosure.Button>
                                        </div>
                                        <Disclosure.Panel className="bg-gray-200 px-5 py-2">
                                            <form onSubmit={updateName} className='flex justify-between gap-2 items-center'>
                                                <Input type='text' value={fullName} setValue={setFullName} placeholder="Fullname" />
                                                <Button loading={fullNameLoading} oldValue={user.fullName} value={fullName} />
                                            </form>
                                        </Disclosure.Panel>
                                    </Disclosure>

                                    {/* Update password field */}
                                    <Disclosure>
                                        <div className='flex justify-between px-5 py-2 pe-0'>
                                            <p className="my-1 text-sm leading-relaxed font-montserrat truncate flex-1 flex items-center gap-2">
                                                <span className='font-bold'>Password: </span>
                                                <span>••••••••</span>
                                            </p>
                                            <Disclosure.Button className="px-5 py-2 flex items-center outline-none">
                                                <Pencil />
                                            </Disclosure.Button>
                                        </div>
                                        <Disclosure.Panel className="bg-gray-200 px-5 py-2">
                                            <form onSubmit={changePassword} className='flex flex-col gap-2'>
                                                <Input type='password' value={oldPassword} setValue={setOldPassword} placeholder="Old password" />
                                                <Input type='password' value={newPassword} setValue={setNewPassword} placeholder="New password" />
                                                <div className='flex justify-center'>
                                                    <Button loading={passwordLoading} />
                                                </div>
                                            </form>
                                        </Disclosure.Panel>
                                    </Disclosure>

                                    <div className='w-full flex justify-end pe-5 mt-5'>
                                        <button onClick={logout} className='flex justify-end items-center font-montserrat text-sm border border-violet-500 gap-2 px-2 py-2 rounded-md text-violet-500 hover:bg-violet-50'>
                                            <ArrowRightFromCircle />
                                            Logout
                                        </button>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ProfileSettingsModal
