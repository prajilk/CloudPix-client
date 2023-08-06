import React, { useContext, useEffect, useState } from 'react'
import axiosConfig from "../../api/axios.config"
import heic2any from 'heic2any';
import { UploadsContext } from '../../context/uploadsContext'
import MyDetailsModal from './Modal/MyDetailsModal';
import { ThreeDots } from '../../assets/SVGs';
import ImageContainer from './Modal/components/ImageContainer';

const ShowFiles = () => {

    const { uploads, setUploads } = useContext(UploadsContext); // Get uploads state from UploadContext (contains all uploads)
    const [selectedImage, setSelectedImage] = useState(null); // Store the index of the selected image
    const [isOpen, setIsOpen] = useState(false) // Show details popup

    // Get all images of the user
    useEffect(() => {
        axiosConfig.get('/get-images').then(({ data }) => {
            setUploads(data.images); // Set all images to the state
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
        setIsOpen(true)// Open the modal
    };

    return (
        <div className='w-full h-full border-2 rounded-lg bg-white p-3'>
            <div className='w-full h-full border-2 border-gray-100 rounded-lg bg-white p-5 pt-0 overflow-scroll'>
                <div className='grid grid-cols-2 gap-5 lg:gap-14 md:grid-cols-3 lg:grid-cols-5'>
                    {/* <div className='cursor-pointer px-4 py-2 rounded-md hover:bg-gray-100' key={i}>
                                <img src="1281.png" alt="..." />
                                <p className='font-montserrat break-words text-center font-semibold text-gray-500 w-full text-sm'>{collection}</p>
                            </div> */}

                    {uploads.length !== 0 ? uploads.map((image, i) => {
                        return (
                            <div className='cursor-pointer px-4 py-2 rounded-md hover:bg-gray-100 flex flex-col justify-center relative' key={i}>
                                <div onClick={() => showImg(image.url)} className='max-h-24 mb-3 inline-flex justify-center flex-1'>
                                    <ImageContainer key={i} image={image} />
                                </div>
                                <div className='flex items-center'>
                                    <p className='font-montserrat break-words text-center font-semibold text-gray-500 w-full text-sm truncate'>{image.filename}</p>
                                    <div onClick={() => openModal(i)} className='px-1 py-2 hover:bg-gray-300 rounded-md'>
                                        <ThreeDots />
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <div className='absolute text-xl font-montserrat font-semibold'><span>Upload your first images</span></div>}
                    {isOpen && selectedImage !== null && (
                        <MyDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} image={uploads[selectedImage]} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ShowFiles
