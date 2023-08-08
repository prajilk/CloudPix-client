import React, { useState, useEffect } from 'react';
import heic2any from 'heic2any';
import { ThreeDots } from '../../../../assets/SVGs';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

const ImageContainer = ({ imageKey, image, openModal }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [imageDataUrl, setImageDataUrl] = useState(null);

    useEffect(() => {
        const lastIndex = image.filename.lastIndexOf(".");
        const extension = image.filename.substring(lastIndex + 1);
        if (extension === 'heic') {
            fetch(image.url)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => heic2any({
                    blob: new Blob([arrayBuffer], { type: 'image/heic' }),
                    toType: 'image/jpeg',
                }))
                .then(jpegBlob => {
                    const jpegDataUrl = URL.createObjectURL(jpegBlob);
                    setImageDataUrl(jpegDataUrl);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error('HEIC to JPEG conversion failed:', error);
                    setIsLoading(false);
                });
        } else {
            setImageDataUrl(image.url);
            setIsLoading(false);
        }
    }, [image.url]);

    // Redirect the image url in new tab
    const showImg = (link) => {
        window.open(link, "_blank")
    }

    return (
        <>
            {isLoading || !imageDataUrl ? (
                <>
                    <div role="status" className="flex items-center justify-center h-24 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10/12 mt-3"></div>
                </>
            ) : (
                <>
                    <div onClick={() => showImg(image.url)} className='max-h-24 mb-3 inline-flex justify-center flex-1'>
                        <img src={imageDataUrl} alt="Image" className='h-full' />
                    </div>
                    <div className='flex items-center justify-between'>
                        <TooltipPrimitive.TooltipProvider delayDuration={300}>
                            <TooltipPrimitive.Tooltip>
                                <TooltipPrimitive.TooltipTrigger className="overflow-hidden">
                                    <p className='font-montserrat break-words text-center font-semibold text-gray-500 w-full text-sm truncate'>{image.filename}</p>
                                </TooltipPrimitive.TooltipTrigger>
                                <TooltipPrimitive.TooltipContent className='bg-black text-xs text-white z-20 px-3 py-2 font-montserrat rounded-md cursor-text'>
                                    <p>{image.filename}</p>
                                </TooltipPrimitive.TooltipContent>
                            </TooltipPrimitive.Tooltip>
                        </TooltipPrimitive.TooltipProvider>
                        <div onClick={() => openModal(imageKey)} className='px-1 py-2 hover:bg-gray-300 rounded-md'>
                            <ThreeDots />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ImageContainer;