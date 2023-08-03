import React, { useContext, useEffect, useState } from 'react'
import axiosConfig from "../../api/axios.config"
import { UploadsContext } from '../../context/uploadsContext'
import ShowDetails from './ShowDetails';

const ShowFiles = () => {

    const { uploads, setUploads } = useContext(UploadsContext); // Get uploads state from UploadContext (contains all uploads)
    const [showModal, setShowModal] = React.useState(false); // Show details popup
    const [selectedImage, setSelectedImage] = useState(null); // Store the index of the selected image


    // Get all images of the user
    useEffect(() => {
        axiosConfig.get('/get-images').then((response) => {
            setUploads(response.data.images); // Set all images to the state
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    // Redirect the image url in new tab
    const showImg = (link) => {
        window.open(link, "_blank")
    }

    // Open popup
    const openModal = (imageIndex) => {
        setSelectedImage(imageIndex); // Set the index of the selected image
        setShowModal(true); // Open the modal
    };

    return (
        <div className='w-full h-full border-2 rounded-lg bg-white p-3'>
            <div className='w-full h-full border-2 border-gray-100 rounded-lg bg-white p-5 overflow-scroll'>
                <div className='grid grid-cols-2 gap-5 lg:gap-14 md:grid-cols-3 lg:grid-cols-5'>
                    {/* <div className='cursor-pointer px-4 py-2 rounded-md hover:bg-gray-100' key={i}>
                                <img src="1281.png" alt="..." />
                                <p className='font-montserrat break-words text-center font-semibold text-gray-500 w-full text-sm'>{collection}</p>
                            </div> */}

                    {uploads.length !== 0 ? uploads.map((image, i) => {
                        return (
                            <div className='cursor-pointer px-4 py-2 rounded-md hover:bg-gray-100 flex flex-col justify-center relative' key={i}>
                                <div onClick={() => showImg(image.url)} className='max-h-24 mb-3 inline-flex justify-center flex-1'>
                                    <img src={image.url} alt="..." className='h-full' />
                                </div>
                                <div className='flex items-center'>
                                    <p className='font-montserrat break-words text-center font-semibold text-gray-500 w-full text-sm truncate'>{image.filename}</p>
                                    <div onClick={() => openModal(i)} className='px-1 py-2 hover:bg-gray-300 rounded-md'>
                                        <svg fill="#000000" className='w-3 h-3' version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.055 32.055" transform="rotate(90)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967 C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967 s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967 c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"></path> </g> </g></svg>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <div className='absolute text-xl font-montserrat font-semibold'><span>Upload your first images</span></div>}
                    {showModal && selectedImage !== null && (
                        <ShowDetails setShowModal={setShowModal} image={uploads[selectedImage]} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShowFiles
