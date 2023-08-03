import React, { memo, useCallback, useContext, useState } from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import './FileUpload.css'
import { UploadsContext } from '../../context/uploadsContext';

const FileUpload = ({ toggleFileUpload, setToggleFileUpload }) => {

    // state to store all images of user uploads
    const { setUploads } = useContext(UploadsContext);

    // Store newly uploaded images inside a temporary array, Because of react re-render
    let tempUploads = [];

    // Add newly uploaded images to the React uploads state when user closes FileUpload component
    const updateUploads = (updatedResponse) => {
        setUploads(prevUploads => prevUploads.concat(updatedResponse));
    }

    // Initialize Uppy with desired options
    const uppy = new Uppy({
        restrictions: {
            allowedFileTypes: ['image/*']
        },
        autoProceed: false, // Wait for user interaction to start uploading
    });

    // Add XHRUpload plugin to enable server-side uploads
    uppy.use(XHRUpload, {
        endpoint: import.meta.env.VITE_UPLOAD_ENDPOINT_URL, // Replace with your server-side upload endpoint
        withCredentials: true
    });

    // Store newly uploaded images into tempUploads when upload successfully completed.
    uppy.on('upload-success', (file, response) => {
        tempUploads = response.body.uploads;
    })



    return (
        <div className={`absolute w-full h-fit top-11 right-0 flex justify-end p-5 px-3 md:mt-[.1rem] md:w-fit md:items-center overflow-hidden ${toggleFileUpload ? 'z-40' : '-z-40'} duration-500`}>
            <div className={`bg-white w-full h-fit rounded-lg p-2 md:w-fit ${toggleFileUpload ? 'translate-x-0' : 'translate-x-full'} duration-500 border-2 shadow-xl`}>
                <div className='inline-flex gap-5 items-center'>
                    <button onClick={() => { setToggleFileUpload(false); updateUploads(tempUploads) }} className='p-2 bg-violet-100 rounded-md'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" id="IconChangeColor"> <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" id="mainIconPathAttribute" strokeWidth="1" stroke="#000000"></path> </svg>
                    </button>
                    <span className='font-montserrat font-bold text-gray-600'>Upload Image</span>
                </div>
                <div className='h-[calc(100%_-_2rem)] p-1'>
                    <Dashboard uppy={uppy} />
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
