import React, { useContext, useState } from 'react'
import FileUpload from './FileUpload'
import CreateCollection from './CreateCollection'
import { AddFilled, Folder, Gear } from '../../assets/SVGs'
import { ProfileModalContext } from '../../context/uploadsContext'

const UploadCard = () => {

    const { setProfileModal } = useContext(ProfileModalContext);

    const [toggleFileUpload, setToggleFileUpload] = useState(false)
    const [toggleCreateCollection, setToggleCreateCollection] = useState(false)

    return (
        <>
            <div className='flex justify-between md:flex-col md:gap-4'>
                <div onClick={() => setToggleCreateCollection(true)} className='bg-white p-3 text-xs rounded-lg text-violet-500 shadow-lg font-montserrat font-bold flex items-center justify-center w-fit cursor-pointer md:w-fit md:text-sm md:gap-3 md:shadow-xl'>
                    <Folder />
                    Create collection
                </div>
                <div onClick={() => setToggleFileUpload(true)} className='bg-white p-3 text-xs rounded-lg text-violet-500 shadow-lg font-montserrat font-bold flex items-center justify-center w-fit cursor-pointer md:w-fit md:flex-col md:px-10 md:py-20 md:text-sm md:gap-2 md:shadow-xl'>
                    <AddFilled />
                    Upload Images
                </div>
                <div onClick={() => setProfileModal(true)} className='bg-white p-3 text-xs rounded-lg text-violet-500 shadow-lg font-montserrat font-bold items-center justify-start w-fit cursor-pointer hidden md:flex md:w-full md:text-sm md:gap-3 md:shadow-xl'>
                    <Gear />
                    Settings
                </div>
            </div>
            <CreateCollection toggleCreateCollection={toggleCreateCollection} setToggleCreateCollection={setToggleCreateCollection} />
            <FileUpload toggleFileUpload={toggleFileUpload} setToggleFileUpload={setToggleFileUpload} />
        </>
    )
}

export default UploadCard
