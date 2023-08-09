import React, { useContext } from 'react';
import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import axiosConfig from '../../api/axios.config';
import Tus from '@uppy/tus';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import './FileUpload.css'
import { UploadsContext } from '../../context/uploadsContext';
import { ChevronRight } from '../../assets/SVGs';
import { toast } from 'react-hot-toast';

const FileUpload = ({ toggleFileUpload, setToggleFileUpload }) => {

    // state to store all images of user uploads
    const { setUploads } = useContext(UploadsContext);

    // Store newly uploaded images inside a temporary array, Because of react re-render
    let tempUploads = [];

    // Add newly uploaded images to the React uploads state when user closes FileUpload component
    const updateUploadsLocally = (localUploads) => {
        setUploads(prevUploads => prevUploads.concat(localUploads))
    }

    // Add uploaded images with url and id to the uploads state
    const updateUploads = (updatedResponse) => {
        setUploads(prevState => {
            const updatedUploads = prevState.map((upload) => {
                const matchFileObj = updatedResponse.find((resObj) => upload.file_id === resObj.file_id);
                return matchFileObj ? { ...matchFileObj } : upload;
            });

            return updatedUploads; // Return the updated state
        })
    }

    // Function to update new Uploads in mongoDB
    const updateDatabase = (imageDetailsArray) => {
        axiosConfig.post('/update-database', { data: imageDetailsArray })
            .then(({ data }) => {
                updateUploads(data.uploads) // Send array of data with url and id to updateUploads function
            })
            .catch(() => {
                toast.error("Something went wrong, Reload the page!")
            })
    }

    // Don’t forget to keep the Uppy instance outside of your component.
    const uppy = new Uppy({
        restrictions: {
            allowedFileTypes: ['image/*']
        },
        autoProceed: false,
    }).use(Tus, {
        endpoint: import.meta.env.VITE_UPLOAD_ENDPOINT_URL,
        withCredentials: true,
    });

    // Store newly uploaded images into tempUploads when upload successfully completed.
    uppy.on('complete', (result) => {
        if (result.successful.length !== 0) {
            const modifiedObjArray = result.successful.map((upload, i) => {
                return {
                    file_id: upload.uploadURL.split('/').slice(-1)[0],
                    filename: upload.name,
                    size: upload.size,
                    date: new Date()
                }
            })
            tempUploads = modifiedObjArray;
            updateDatabase(tempUploads); // call function to update in mongodb
        }
    })

    return (
        <div className={`absolute w-full h-fit top-11 right-0 flex justify-end p-5 px-3 md:mt-[.1rem] md:w-fit md:items-center overflow-hidden ${toggleFileUpload ? 'z-40' : '-z-40'} duration-500`}>
            <div className={`bg-white w-full h-fit rounded-lg p-2 md:w-fit ${toggleFileUpload ? 'translate-x-0' : 'translate-x-full'} duration-500 border-2 shadow-xl`}>
                <div className='inline-flex gap-5 items-center'>
                    <button onClick={() => { setToggleFileUpload(false); updateUploadsLocally(tempUploads) }} className='p-2 bg-violet-100 rounded-md'>
                        <ChevronRight />
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
