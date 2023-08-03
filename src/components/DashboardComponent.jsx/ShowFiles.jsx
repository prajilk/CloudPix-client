import React, { useEffect, useState } from 'react'
import axiosConfig from "../../api/axios.config"

const ShowFiles = () => {

    const [images, setImages] = useState([]);

    useEffect(() => {
        axiosConfig.get('/get-images').then((response) => {
            setImages(response.data.images);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const showImg = (link) => {
        window.open(link, "_blank")
    }

    return (
        <div className='w-full h-full border-2 rounded-lg bg-white p-3'>
            <div className='w-full h-full border-2 border-gray-100 rounded-lg bg-white p-5 overflow-scroll'>
                <div className='grid grid-cols-2 gap-5 lg:gap-14 md:grid-cols-3 lg:grid-cols-5'>
                    {/* <div className='cursor-pointer px-4 py-2 rounded-md hover:bg-gray-100' key={i}>
                                <img src="1281.png" alt="..." />
                                <p className='font-montserrat break-words text-center font-semibold text-gray-500 w-full text-sm'>{collection}</p>
                            </div> */}
                    {images.length !== 0 ? images.map((image, i) => {
                        return (
                            <div onClick={() => showImg(image.url)} className='cursor-pointer px-4 py-2 rounded-md hover:bg-gray-100 flex flex-col justify-center' key={i}>
                                <img src={image.url} alt="..." className='max-h-24 mb-3' />
                                <p className='font-montserrat break-words text-center font-semibold text-gray-500 w-full text-sm'>{image.filename}</p>
                            </div>
                        )
                    }) : <div className='absolute text-xl font-montserrat font-semibold'><span>Upload your first images</span></div>}
                </div>
            </div>
        </div>
    )
}

export default ShowFiles
